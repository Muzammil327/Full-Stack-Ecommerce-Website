import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.JWT_SECRET,
    cookieName: "next-auth.session-token",
  });

  const isAdminPath = request.nextUrl.pathname.startsWith("/admin");
  const isProfilePath = request.nextUrl.pathname.startsWith("/profile");
  const isCartPath = request.nextUrl.pathname.startsWith("/cart");
  const isCheckoutPath = request.nextUrl.pathname.startsWith("/checkout");
  const isSignInPath = request.nextUrl.pathname.startsWith("/sign-in");
  const isCreateAccountPath =
    request.nextUrl.pathname.startsWith("/create-account");

  if (isCreateAccountPath) {
    try {
      if (token) {
        console.log("token get");
        // If the user's role is admin, redirect to the admin page
        if (token.role === "admin") {
          console.log("User is an admin, redirecting to admin page");
          request.nextUrl.pathname = "/admin";
          return NextResponse.redirect(new URL(request.nextUrl.href));
        }
        if (token.role === "user") {
          console.log("User is not an admin, redirecting to profile page");
          request.nextUrl.pathname = "/profile";
          return NextResponse.redirect(new URL(request.nextUrl.href));
        }
      } else {
        console.log("token no");
        return NextResponse.next();
      }
    } catch (error) {
      console.error("Error checking session:", error);
    }
  }

  if (isSignInPath) {
    try {
      if (token) {
        console.log("token get");
        if (token.role === "admin") {
          console.log("User is an admin, redirecting to admin page");
          request.nextUrl.pathname = "/admin";
          return NextResponse.redirect(new URL(request.nextUrl.href));
        }
        if (token.role === "user") {
          console.log("User is not an admin, redirecting to profile page");
          request.nextUrl.pathname = "/profile";
          return NextResponse.redirect(new URL(request.nextUrl.href));
        }
      } else {
        console.log("token no");
        return NextResponse.next();
      }
    } catch (error) {
      console.error("Error checking session:", error);
    }
  }
  if (isCartPath || isCheckoutPath) {
    try {
      if (token) {
        console.log("token get");
        return NextResponse.next();
      } else {
        console.log("token no");
        request.nextUrl.pathname = "/sign-in"; // Update the path to the full URL
        return NextResponse.redirect(new URL(request.nextUrl.href));
      }
    } catch (error) {
      console.error("Error checking session:", error);
    }
  }
  if (isAdminPath) {
    try {
      if (token) {
        // console.log("token get");
        if (isAdminPath && token.role === "admin") {
          // console.log("Admin access granted");
          return NextResponse.next();
        } else if (token.role === "user") {
          // console.log("User not access");
          request.nextUrl.pathname = "/profile";
          return NextResponse.redirect(new URL(request.nextUrl.href));
        }
      } else {
        // console.log("Token not found, redirecting to sign-in page");
        request.nextUrl.pathname = "/sign-in";
        return NextResponse.redirect(new URL(request.nextUrl.href));
      }
    } catch (error) {
      console.error("Error checking session:", error);
    }
  }
  if (isProfilePath) {
    try {
      if (token) {
        // console.log("token get");
        if (isProfilePath && token.role === "user") {
          // console.log("Admin access granted");
          return NextResponse.next();
        } else if (token.role === "admin") {
          // console.log("User not access");
          request.nextUrl.pathname = "/admin";
          return NextResponse.redirect(new URL(request.nextUrl.href));
        }
      } else {
        // console.log("Token not found, redirecting to sign-in page");
        request.nextUrl.pathname = "/sign-in";
        return NextResponse.redirect(new URL(request.nextUrl.href));
      }
    } catch (error) {
      console.error("Error checking session:", error);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile",
    "/cart",
    "/admin",
    "/checkout",
    "/create-account",
    "/sign-in",
  ],
};
