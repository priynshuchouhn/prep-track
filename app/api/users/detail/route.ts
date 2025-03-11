import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth"; // Assuming you have authentication middleware
import prisma from "@/lib/prisma"; // Adjust if your prisma instance is in a different location

// ✅ GET: Fetch the logged-in user's details
export async function GET(req: NextRequest) {
    try {
        const session = await auth(); // Get authenticated user
        if (!session || !session.user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        let userDetail = await prisma.userDetail.findUnique({
            where: { userId: session.user.id },
        });

        if (!userDetail) {
            userDetail = await prisma.userDetail.create({
                data: {
                    userId: session.user.id,
                    about: "",
                    github: null,
                    linkedin: null,
                    website: null,
                    skills: [],
                    education: null,
                    experience: null,
                },
            });
        }

        return NextResponse.json(userDetail);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch user details" }, { status: 500 });
    }
}

// ✅ PUT: Update user details
export async function PUT(req: NextRequest) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { about, github, linkedin, website, skills, education, experience } = await req.json();

        const updatedUserDetail = await prisma.userDetail.update({
            where: { userId: session.user.id },
            data: {
                about,
                github,
                linkedin,
                website,
                skills,
                education,
                experience,
            },
        });

        return NextResponse.json(updatedUserDetail);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update user details" }, { status: 500 });
    }
}
