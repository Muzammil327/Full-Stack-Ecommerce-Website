import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const secret = process.env.JWT_SECRET;
  const token = await getToken({
    req: request,
    secret: secret,
    cookieName: "next-auth.session-token",
  });
  // role base authentication
  if (token) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    if (pathname === "/create-account") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } else {
    // User is not authenticated
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Redirect non-authenticated users away from the profile page
    if (pathname === "/profile" || pathname === "/admin") {
      return NextResponse.redirect(new URL("/sign-in", request.url)); // Redirect to sign-in page
    } else {
      // Allow access to other pages for non-authenticated users
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: ["/", "/sign-in", "/create-account", "/profile", "/admin"],
};
