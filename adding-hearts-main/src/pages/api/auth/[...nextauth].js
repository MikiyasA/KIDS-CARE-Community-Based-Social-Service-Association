import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "../../../../models/User";

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
        const user = await User.findOne({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("User is not recognized");
        }
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordCorrect) {
          throw new Error("Incorrect password");
        }
        if (user.status !== "active") {
          throw new Error("User is not active");
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

  // Uncomment and adjust the following line if you have a custom sign-in page
  // pages: {
  //   signIn: '/auth/signin',
  // },
});
