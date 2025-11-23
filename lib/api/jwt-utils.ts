import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";

const isDev = process.env.ENVIRONMENT === "DEV";

/**
 * Get the encoded NextAuth JWT token to send to backend
 * The backend expects a signed JWT token (HS256) with:
 * - githubUsername (camelCase)
 * - sub (subject)
 * - exp (expiration as Unix timestamp)
 * - iat (issued at as Unix timestamp)
 * 
 * Note: We use jsonwebtoken to create a signed JWT (HS256) instead of
 * NextAuth's encrypted JWT (A256GCM) because the backend expects a signed token.
 */
export async function getEncodedJWT(req: NextRequest): Promise<string | null> {
  const token = await getToken({ req });
  if (!token) {
    console.log("[JWT] No token found in request");
    return null;
  }

  // Prepare token payload with backend-required fields
  const now = Math.floor(Date.now() / 1000); // Current time as Unix timestamp
  const maxAge = 30 * 24 * 60 * 60; // 30 days in seconds
  
  const tokenPayload: any = {
    ...token,
    // Ensure githubUsername is set (backend expects camelCase)
    githubUsername: (token as any).githubUsername || (token as any).github_user_name,
    // Ensure sub (subject) is set if not already present
    sub: (token as any).sub || (token as any).user_id || String((token as any).id),
    // Add exp and iat explicitly (required for JWT)
    exp: now + maxAge,
    iat: now,
    isDev: isDev,
  };

  // Sign the JWT using HS256 algorithm (not encrypt)
  // This creates a signed JWT (JWS) that the backend can decode with jwt.decode()
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    console.error("[JWT] NEXTAUTH_SECRET is not set");
    return null;
  }

  const encoded = jwt.sign(
    tokenPayload,
    secret,
    {
      algorithm: 'HS256',
      // Note: issuer and audience are not set since backend has them as None
      // If backend expects these, uncomment and set appropriate values:
      // issuer: 'your-issuer',
      // audience: 'your-audience',
    }
  );

  // Decode the signed token to verify what was actually encoded
  try {
    const decodedEncoded = jwt.decode(encoded, { complete: true });
    
    if (decodedEncoded && typeof decodedEncoded === 'object' && 'payload' in decodedEncoded) {
      const payload = decodedEncoded.payload as any;
      const exp = typeof payload.exp === 'number' ? payload.exp : null;
      const iat = typeof payload.iat === 'number' ? payload.iat : null;      
    }
  } catch (error) {
    console.warn("[JWT] Failed to decode signed token for verification:", error);
  }
  
  return encoded;
}