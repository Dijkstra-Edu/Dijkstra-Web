// app/api/qa-gate/route.ts
import { NextResponse } from "next/server";
import { serialize } from "cookie";
import crypto from "crypto";

const ENV = process.env.ENVIRONMENT || "DEV";

export async function POST(req: Request) {
  console.log("QA Gate API called, ENV:", ENV);
  
  if (ENV !== "QA") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }

    const secretKey = process.env.SECRET_KEY;
    const ghToken = process.env.GITHUB_TOKEN;
    const teamNames = process.env.TEAM_NAMES;

    if (!secretKey || !ghToken || !teamNames) {
      console.error("Missing required env vars:", {
        hasSecretKey: !!secretKey,
        hasGhToken: !!ghToken,
        hasTeamNames: !!teamNames,
      });
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const expectedPassword = `${username}-${secretKey}`;
    const isValid =
      password.length === expectedPassword.length &&
      crypto.timingSafeEqual(Buffer.from(password), Buffer.from(expectedPassword));

    if (!isValid) {
      console.log("Invalid password for user:", username);
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const org = "Dijkstra-Edu";

    console.log("Checking GitHub org membership for:", username);

    // Check if user is in org
    const orgRes = await fetch(`https://api.github.com/orgs/${org}/members/${username}`, {
      headers: {
        Authorization: `Bearer ${ghToken}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "QA-Gate-App",
      },
    });

    console.log("Org check response:", orgRes.status);

    if (orgRes.status === 404) {
      return NextResponse.json({ 
        error: "Not a member of Dijkstra-Edu organization"
      }, { status: 403 });
    } else if (orgRes.status === 401) {
      return NextResponse.json({ error: "GitHub token invalid" }, { status: 500 });
    } else if (!orgRes.ok) {
      return NextResponse.json({ error: "Organization check failed" }, { status: 403 });
    }

    console.log("Checking team membership for:", username, "in teams:", teamNames);

    // Split team names and check membership in any of them
    const allowedTeams = teamNames.split(',').map(team => team.trim());
    let userInTeam = false;
    let memberOfTeams: string[] = [];

    for (const teamName of allowedTeams) {
      console.log("Checking membership in team:", teamName);
      
      const teamRes = await fetch(
        `https://api.github.com/orgs/${org}/teams/${teamName}/members/${username}`,
        {
          headers: {
            Authorization: `Bearer ${ghToken}`,
            Accept: "application/vnd.github+json",
            "User-Agent": "QA-Gate-App",
          },
        }
      );

      console.log(`Team '${teamName}' check response:`, teamRes.status);

      if (teamRes.status === 200 || teamRes.status === 204) {
        userInTeam = true;
        memberOfTeams.push(teamName);
        console.log(`User is a member of team: ${teamName}`);
        break;
      } else if (teamRes.status === 404) {
        console.log(`User is not a member of team: ${teamName} (or team doesn't exist)`);
      } else if (teamRes.status === 401) {
        return NextResponse.json({ error: "Insufficient permissions to check team membership" }, { status: 500 });
      } else {
        console.error(`Team '${teamName}' membership check failed:`, teamRes.status);
      }
    }

    if (!userInTeam) {
      return NextResponse.json({ 
        error: `Not a member of any required development teams`
      }, { status: 403 });
    }

    // All checks passed - issue cookie
    console.log("All checks passed, issuing cookie. User is member of teams:", memberOfTeams);
    return issueSuccessResponse(`Access granted for team member of: ${memberOfTeams.join(', ')}`);

  } catch (err) {
    console.error("QA verify error:", err);
    return NextResponse.json({
      error: "Internal server error",
      details: ENV === "QA" ? String(err) : undefined
    }, { status: 500 });
  }
}

function issueSuccessResponse(note: string) {
  const res = NextResponse.json({
    success: true,
    message: "Access granted",
    note,
    timestamp: new Date().toISOString(),
  });

  res.headers.set(
    "Set-Cookie",
    serialize("qa_verified", "true", {
      path: "/",
      httpOnly: true,
      secure: ENV === "QA",
      sameSite: "lax",
      maxAge: 60 * 60 * 8, // 8 hours
    })
  );

  return res;
}