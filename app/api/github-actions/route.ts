// app/api/github-actions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token || !token.access_token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const accessToken = token.access_token as string;
  const headers = {
    Authorization: `token ${accessToken}`,
    Accept: "application/vnd.github.v3+json",
  };

  const usersToFollow = (process.env.GITHUB_USERS_TO_FOLLOW || "").split(",");
  const reposToStar = (process.env.GITHUB_REPOS_TO_STAR || "").split(",");

  const followResults = [];
  const starResults = [];

  for (const username of usersToFollow) {
    const res = await fetch(`https://api.github.com/user/following/${username}`, { headers });
    if (res.status === 404) {
      await fetch(`https://api.github.com/user/following/${username}`, {
        method: "PUT",
        headers,
      });
      followResults.push(`Followed ${username}`);
    }
  }

  for (const fullName of reposToStar) {
    const [owner, repo] = fullName.trim().split("/");
    if (!owner || !repo) continue;

    const res = await fetch(`https://api.github.com/user/starred/${owner}/${repo}`, { headers });
    if (res.status === 404) {
      await fetch(`https://api.github.com/user/starred/${owner}/${repo}`, {
        method: "PUT",
        headers,
      });
      starResults.push(`Starred ${owner}/${repo}`);
    }
  }

  return NextResponse.json({
    status: "done",
    followed: followResults,
    starred: starResults,
  });
}
