// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(
//   function middleware(req) {
//     // Optional: Additional logic for authenticated users
//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ req, token }) => {
//         const path = req.nextUrl.pathname;

//         // Allow auth-related routes
//         if (
//           path.startsWith('/api/auth') ||
//           path.startsWith('/_next') ||
//           path.includes('.')
//         ) {
//           return true;
//         }

//         // Public routes
//         if (path === "/login" || path.startsWith("/onboarding")) {
//           return true;
//         }

//         // Protected routes require authentication
//         return token != null;
//       },
//     },
//     pages: {
//       signIn: "/login", // Ensure this is your sign-in page
//       error: "/login",
//     },
//   }
// );

// export const config = {
//   matcher: [
//     "/((?!_next/static|_next/image|favicon.ico|api/auth|.*\\.(?:png|jpg|jpeg|gif|svg|ico)$).*)",
//   ],
// };

// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    //console.log("Middleware running for:", req.nextUrl.pathname);
    
    // You can add additional logic here if needed
    // For now, just continue
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        //console.log("Token in authorized:", token);
        const { pathname } = req.nextUrl;

        
        //const publicRoutes = ["/","/login"]; 
        //const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
        
        // Public routes that don't require authentication
        if (pathname === '/' || pathname === "/login" || pathname.startsWith("/onboarding")){
          return true;
        }

        // All other routes require authentication
        return !!(token);
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp)$).*)",
  ],
};