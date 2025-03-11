import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function middleware(req: NextRequest) {
    const session = await auth(); // Get the authenticated user session
    const { pathname } = req.nextUrl;

    if (["/", "/login", "/register"].includes(pathname) || pathname.startsWith("/api")) {
        return NextResponse.next();
    }

    // Allow Next.js static files & images
    if (pathname.startsWith("/_next/static") || pathname.startsWith("/_next/image") || 
        pathname === "/favicon.ico" || pathname === "/sitemap.xml" || pathname === "/robots.txt") {
        return NextResponse.next();
    }

    if (!session) {
        return NextResponse.redirect(new URL("/login", req.url)); // Redirect unauthenticated users
    }

    const userRole = session.user.role; // Assuming "student" or "admin"

    if (userRole === "STUDENT" && pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/", req.url)); // Students cannot access /admin
    }

    if (userRole === "ADMIN" && !pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/admin", req.url)); // Admins can ONLY access /admin routes
    }

    return NextResponse.next(); // Allow access
}

// Apply middleware to all routes
export const config = {
    matcher: [
        "/((?!api/|_next/static/|_next/image/|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
};
