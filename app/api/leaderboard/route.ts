import  prisma  from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
  const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!, 10) : 10;
  const leaderboard = await prisma.leaderboard.findMany({
    take:limit,
    orderBy: { score: "desc" },
    include:{user:{
      omit: {
        password: true
      },
      include: {
        posts: true
      }
    }},
  });

  return NextResponse.json(leaderboard);
}
