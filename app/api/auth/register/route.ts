import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { name, email, password, image } = await req.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in Prisma
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        image,
        password: hashedPassword,
        role: "STUDENT",
      },
    });

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error registering user" }, { status: 500 });
  }
}
