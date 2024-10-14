import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Find the user by email in the database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // If no user is found or passwords don't match, return null
        if (
          !user ||
          !(await bcrypt.compare(credentials.password, user.password))
        ) {
          return null;
        }

        // If authentication is successful, return the user object
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          profilePicture: user.profilePicture,
          phone: user.phone,
          address: user.address,
        };
      },
    }),
  ],

  session: {
    jwt: true,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.profilePicture = user.profilePicture;
        token.phone = user.phone;
        token.address = user.address;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.profilePicture = token.profilePicture;
      session.user.phone = token.phone;
      session.user.address = token.address;
      return session;
    },
  },

  //   pages: {
  //     signIn: '/auth/signin',
  //   },
});
