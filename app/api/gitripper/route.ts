import { getGithubCommitInformation, getGithubCommitInformationByDates } from "@/server/gitripper/client"
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function GET(req: NextRequest) {
  console.log("Gitripper API called with URL:", req.url)
  const params = req.nextUrl.searchParams
  const timeRange = params.get("range")
  const startDate = params.get("start")
  const endDate = params.get("end")
  const session = await getServerSession(authOptions)
  const username = session?.user?.login
  if (!username) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }
  let data
  if (startDate && endDate) {
    data = await getGithubCommitInformationByDates(startDate, endDate, username)
  }
  else {
    data = await getGithubCommitInformation(timeRange || "30d", username)
  }
  return NextResponse.json(data)
}
