import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const url = request.nextUrl.clone();

  const isAuthPage = url.pathname === "/login" || url.pathname === "/register";
  const isProtectedPage = url.pathname.startsWith("/dashboard");

  if (!token) {
    if (isProtectedPage) {
      console.log("No token, redirigiendo a login");
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next(); // ruta pública sin token
  }

  try {
    await jwtVerify(token, secret);

    // Token válido
    if (isAuthPage) {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    return NextResponse.next(); // token válido y ruta permitida
  } catch (error) {
    // Token inválido
    if (isProtectedPage) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    return NextResponse.next(); // token inválido pero en ruta pública
  }
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*"],
};
