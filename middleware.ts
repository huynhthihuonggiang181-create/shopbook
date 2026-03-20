// =============================================================
// ShopBook - Middleware (Role-Based Route Protection)
// =============================================================

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Routes that require authentication
const protectedRoutes = ["/cart", "/checkout", "/profile"];

// Routes that require ADMIN role
const adminRoutes = ["/admin"];

// Auth pages (redirect to home if already logged in)
const authRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    // Redirect authenticated users away from auth pages
    if (authRoutes.some((route) => pathname.startsWith(route))) {
        if (token) {
            return NextResponse.redirect(new URL("/", request.url));
        }
        return NextResponse.next();
    }

    // Protect admin routes - require ADMIN role
    if (adminRoutes.some((route) => pathname.startsWith(route))) {
        if (!token) {
            const url = new URL("/login", request.url);
            url.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(url);
        }
        if (token.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/", request.url));
        }
        return NextResponse.next();
    }

    // Protect user routes - require authentication
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
        if (!token) {
            const url = new URL("/login", request.url);
            url.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(url);
        }
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*",
        "/cart/:path*",
        "/checkout/:path*",
        "/profile/:path*",
        "/login",
        "/register",
    ],
};
