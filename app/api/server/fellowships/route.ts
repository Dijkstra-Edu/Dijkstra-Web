//app/api/server/fellowships/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://dataforge-qa.onrender.com/Dijkstra/v1/fellowships/");
  const data = await res.json();
  return NextResponse.json(data);
}
