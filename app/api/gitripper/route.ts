import { getGithubCommitInformation } from "@/server/gitripper/client"
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function GET(req: NextRequest) {
  console.log("Gitripper API called with URL:", req.url)
  const timeRange = req.nextUrl.searchParams.get("range")
  const session = await getServerSession(authOptions);
  const username = session?.user?.login;
  if (!username) {
    return new Response(
      JSON.stringify({ error: "Unauthorized: user not authenticated" }),
      { status: 401 }
    )
  }
  const data = await getGithubCommitInformation(timeRange || "30d", username)
  return NextResponse.json(data)
}
