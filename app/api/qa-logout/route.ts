// app/api/qa-logout/route.ts
import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { ENV } from "@/lib/constants";

export async function POST(req: Request) {  
  // Allow this in any environment for cleanup purposes
  try {
    const url = new URL(req.url);
    const isSecure = url.protocol === "https:";
    
    const cookieOptions = {
      path: "/",
      httpOnly: true,
      secure: ENV === "QA" ? true : isSecure,
      sameSite: "lax" as const,
      maxAge: 0,
      expires: new Date(0),
    };
    
    const cookieHeader = serialize("qa_verified", "", cookieOptions);
    
    const res = NextResponse.json({ 
      success: true, 
      message: "QA access cleared",
      timestamp: new Date().toISOString(),
      cookieCleared: true,
      environment: ENV
    });
    
    // Set multiple cookie clearing headers to be sure
    res.headers.set("Set-Cookie", cookieHeader);
    
    return res;
  } catch (err) {
    console.error("QA logout error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}