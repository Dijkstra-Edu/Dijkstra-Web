// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const ENV = process.env.ENVIRONMENT || "DEV";

export default withAuth(
  async function middleware(req) {
    const { pathname, origin} = req.nextUrl;
   
    // QA lockdown - block EVERYTHING except QA gate routes
    if (ENV === "QA") {
      const token = req.nextauth.token;
      const bypassCookie = req.cookies.get("qa_verified")?.value;
     
      // ONLY allow QA gate routes and essential API routes
      const isQAGateRoute = 
        pathname.startsWith("/qa-gate") ||
        pathname.startsWith("/api/qa-gate") ||
        pathname.startsWith("/api/qa-logout") ||
        pathname.startsWith("/api/auth"); // NextAuth API routes
      
      // If QA gate route, allow through
      if (isQAGateRoute) {
        return NextResponse.next();
      }
      
      // For ALL other routes (including /login), check QA bypass first
      if (!bypassCookie) {
        return NextResponse.redirect(new URL("/qa-gate", origin));
      }
     
      // After QA bypass is confirmed, check NextAuth requirements
      // Allow /login page since user has passed QA gate
      if (pathname === "/" || pathname === "/login") {
        return NextResponse.next();
      }
      
      // For all other protected routes, also require NextAuth token
      if (!token) {
        return NextResponse.redirect(new URL("/", origin));
      }
    }
   
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
       
        // For QA environment, let the main middleware handle all authorization
        if (ENV === "QA") {
          return true;
        }
       
        // Always allow these public routes in non-QA environments
        if (
          pathname === "/" ||
          pathname === "/login" ||
          pathname.startsWith("/onboarding") ||
          pathname.startsWith("/api/auth")
        ) {
          return true;
        }
       
        // For non-QA environments, require token for protected routes
        return !!token;
      },
    },
    //pages: {
    //  signIn: "/login",
    //},
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp)$).*)",
  ],
};