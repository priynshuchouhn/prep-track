
import NextAuth, { DefaultSession, User, } from "next-auth";
import Credentials from "next-auth/providers/credentials"
import prisma from '@/lib/prisma'
import bcrypt from "bcryptjs"

declare module "next-auth" {
  interface User {
    id?: string;
    role: string;
    postCount:number,
    currentStreak:number
  }
  interface Session {
    user: User & DefaultSession["user"];
  }
}


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
          include: {leaderboard: true, streak:true}
        });
        if (!user) {
          console.log("User not found");
          return null;
        }
        const passwordMatch = await bcrypt.compare(credentials.password as string, user.password);
        if (!passwordMatch) {
          console.log("Invalid password");
          return null;
        }
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image || null,
          role: user.role,
          postCount: user.leaderboard?.postCount || 0,
          currentStreak: user.streak?.currentStreak || 0
        } as User;
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.postCount = user.postCount;
        token.streak = user.currentStreak;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string
        session.user.postCount = token.postCount as number
        session.user.currentStreak = token.streak as number
      }
      return session;
    },
  },
})

