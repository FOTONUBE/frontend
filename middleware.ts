import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

// Rutas exclusivas por rol, usando startsWith para rutas dinámicas
const roleRoutes = {
  photographer: [
    "/dashboard/general",
    "/dashboard/newalbum",
    "/dashboard/albums", // incluye /albums/:id
    "/dashboard/orders", // incluye /orders/:id
    "/dashboard/subscription",
    "/dashboard/profile-photographer",
  ],
  buyer: [
    "/dashboard/ingresar-album",
    "/dashboard/ver-album", // incluye /ver-album/:albumId
    "/dashboard/como-comprar",
    "/dashboard/pedidos", // incluye /pedidos/:orderId
    "/dashboard/profile-buyer",
  ],
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const url = request.nextUrl.clone();

  const isAuthPage = url.pathname === "/login" || url.pathname === "/register";
  const isProtectedPage = url.pathname.startsWith("/dashboard");

  if (!token) {
    if (isProtectedPage) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  try {
    const payload: any = (await jwtVerify(token, secret)).payload;
    const userRole = payload.role;

    if (isAuthPage) {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    // Onboarding fotógrafos
    const isPhotographer = userRole === "photographer";
    const needsOnboarding =
      isPhotographer &&
      (!payload.name ||
        !payload.phone ||
        !payload.paymentAccounts?.some(
          (acc: any) => acc.provider === "mercadopago" && acc.accessToken
        ));

    const profilePath = "/dashboard/profile-photographer";

    if (needsOnboarding && url.pathname !== profilePath) {
      url.pathname = profilePath;
      return NextResponse.redirect(url);
    }

    // Validación rutas por rol (incluye dinámicas con startsWith)
    const allowedRoutes = roleRoutes[userRole as keyof typeof roleRoutes] || [];
    const isAllowed = allowedRoutes.some((route) =>
      url.pathname.startsWith(route)
    );

    if (!isAllowed && isProtectedPage) {
      // Redirige a la ruta principal del rol
      url.pathname =
        userRole === "photographer"
          ? "/dashboard/general"
          : "/dashboard/ingresar-album";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (error) {
    if (isProtectedPage) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*"],
};
