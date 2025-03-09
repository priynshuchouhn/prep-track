
import NextAuth, { DefaultSession, } from "next-auth";
import Credentials from "next-auth/providers/credentials"
import prisma from '@/lib/prisma'
import bcrypt from "bcryptjs"

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string; // Add the role field here
    } & DefaultSession["user"];
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
          where: { email: credentials.email as string }
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
          role: user.role
        };
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
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string
      }
      return session;
    },
  },
})

// CredentialsProvider({
//   name: "Credentials",
//   credentials: {
//     email: { label: "Email", type: "email" },
//     password: { label: "Password", type: "password" }
//   },
//   async authorize(credentials) {
//     // This is where you would typically verify the user credentials
//     // against your database
//     if (credentials?.email === "user@example.com" && credentials?.password === "password") {
//       return {
//         id: "1",
//         name: "John Doe",
//         email: "user@example.com",
//         image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100"
//       };
//     }
//     return null;
//   }
// })