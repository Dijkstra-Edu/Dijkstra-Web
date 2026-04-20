import { NextRequest } from "next/server";
import { getAuthTokenForGithubAccountController } from "@/nextjs-server/Controllers/AuthDataController";

export async function GET(request: NextRequest) {
  return getAuthTokenForGithubAccountController(request);
}
