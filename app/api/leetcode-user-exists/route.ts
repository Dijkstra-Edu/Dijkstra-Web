import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function isValidLeetCodeUsername(username: string): boolean {
  const normalized = username.trim();
  if (normalized.length === 0) return false;
  const pattern = /^[A-Za-z0-9_-]{3,20}$/;
  return pattern.test(normalized);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = (searchParams.get("u") || "").trim();

    if (!isValidLeetCodeUsername(username)) {
      return NextResponse.json({ exists: false, reason: "invalid" }, { status: 400 });
    }

    // Use LeetCode's GraphQL API
    const graphqlQuery = {
      query: `
        query userPublicProfile($username: String!) {
          matchedUser(username: $username) {
            username
            profile {
              realName
              userAvatar
            }
          }
        }
      `,
      variables: { username }
    };

    const graphqlRes = await fetch('https://leetcode.com/graphql/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://leetcode.com/',
      },
      body: JSON.stringify(graphqlQuery)
    });

    if (!graphqlRes.ok) {
      return NextResponse.json({ exists: false, error: 'GraphQL request failed' }, { status: 500 });
    }

    const data = await graphqlRes.json();
    const exists = Boolean(data.data?.matchedUser?.username);

    return NextResponse.json({ exists });
  } catch (err) {
    return NextResponse.json({ exists: false, error: err instanceof Error ? err.message : 'Unknown error' }, { status: 500 });
  }
}


