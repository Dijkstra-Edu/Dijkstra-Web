// app/api/qa-logout/route.ts
import { NextResponse } from "next/server";
import { serialize } from "cookie";

const ENV = process.env.ENVIRONMENT || "DEV";

export async function POST(req: Request) {
  console.log("QA logout API called");
// console.log("Current cookies:", req.headers.get("cookie"));
  
  // Allow this in any environment for cleanup purposes
  try {
    const cookieOptions = {
      path: "/",
      httpOnly: true,
      secure: process.env.ENV === "QA",
      sameSite: "lax" as const,
      maxAge: 0,
      expires: new Date(0),
    };
    
    const cookieHeader = serialize("qa_verified", "", cookieOptions);
    console.log("Setting cookie header:", cookieHeader);
    
    const res = NextResponse.json({ 
      success: true, 
      message: "QA access cleared",
      timestamp: new Date().toISOString(),
      cookieCleared: true,
      environment: process.env.ENV
    });
    
    // Set multiple cookie clearing headers to be sure
    res.headers.set("Set-Cookie", cookieHeader);
    
    // Alternative approach: set multiple cookies with different variations
    res.headers.append("Set-Cookie", serialize("qa_verified", "", {
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    }));
    
    console.log("QA cookie cleared successfully");
    return res;
  } catch (err) {
    console.error("QA logout error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}