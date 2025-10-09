import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

const dashboardRoots = {
  photographer: "/dashboard/fotografo/general",
  buyer: "/dashboard/comprador/ingresar-album",
};

// Prefijo principal permitido por rol
const roleRoutes = {
  photographer: "/dashboard/fotografo",
  buyer: "/dashboard/comprador",
};

// Rutas especiales accesibles por ambos roles
const specialRoutes = [
  "/dashboard/mp/callback",
  "/dashboard/mp/success",
  "/dashboard/mp/error",
  "/dashboard/profile",
];

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const token = request.cookies.get("token")?.value;

  const isAuthPage = ["/login", "/register"].includes(url.pathname);
  const isProtected = url.pathname.startsWith("/dashboard");

  // 🔹 No hay token → redirigir al login si intenta acceder al dashboard
  if (!token) {
    if (isProtected) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  try {
    const { payload }: any = await jwtVerify(token, secret);
    const userRole = payload.role as "photographer" | "buyer";

    // 🔹 Si está logueado y entra a login/register → redirigir a su dashboard
    if (isAuthPage) {
      url.pathname = dashboardRoots[userRole];
      return NextResponse.redirect(url);
    }

    // 🔹 Rutas especiales compartidas
    const isSpecial = specialRoutes.some((route) =>
      url.pathname.startsWith(route)
    );

    // 🔹 Validación de acceso por rol
    const allowedRoot = roleRoutes[userRole];
    if (isProtected && !url.pathname.startsWith(allowedRoot) && !isSpecial) {
      url.pathname = dashboardRoots[userRole];
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch {
    // 🔹 Token inválido o expirado → login
    if (isProtected) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*"],
};
