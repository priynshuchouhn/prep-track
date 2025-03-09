import  prisma  from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const leaderboard = await prisma.leaderboard.findMany({
    orderBy: { score: "desc" },
    include:{user:true},
  });

  return NextResponse.json(leaderboard);
}
