import { NextRequest, NextResponse } from "next/server";
import { getAuthTokenForGithubAccount } from "@/nextjs-server/Services/AuthDataService";
export async function getAuthTokenForGithubAccountController(request: NextRequest) {
  try {
    const accountId = request.nextUrl.searchParams.get("accountId");
     if (!accountId) {
      return NextResponse.json(
        { message: "accountId is required" },
        { status: 400 }
      );
    }
    const authToken = await getAuthTokenForGithubAccount(accountId);
    return NextResponse.json(authToken, { status: 200 });
  } catch (error) {
    console.error("Error fetching GitHub auth token:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to get auth token for GitHub account",
      },
      { status: 500 }
    );
  }
}