import { NextResponse } from "next/server";
import prisma  from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const tags = await prisma.tag.findMany();
    return NextResponse.json(tags);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tags" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { name } = await req.json();
    if (!name) return NextResponse.json({ error: "Tag name is required" }, { status: 400 });

    const newTag = await prisma.tag.create({ data: { name } });
    return NextResponse.json(newTag, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating tag" }, { status: 500 });
  }
}
