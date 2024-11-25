import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "../../../utils/connectMongo"; // Adjust path
import User from "../../../models/UserSchema";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          console.error("Missing email or password in credentials.");
          throw new Error("Please provide both email and password.");
        }

        console.log("Connecting to MongoDB...");
        await connectMongo();

        console.log(`Finding user with email: ${credentials.email}`);
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          console.error(`No user found with email: ${credentials.email}`);
          throw new Error("No user found with this email.");
        }

        console.log("Stored Password Hash:", user.password);
        console.log("Entered Password:", credentials.password);

        // Hashing Debugging (just for testing)
        const rehashedPassword = await bcrypt.hash(credentials.password, 10);
        console.log("Rehashed Entered Password (for debug):", rehashedPassword);

        // Compare the hashed password
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        console.log("Password Valid:", isValidPassword);

        if (!isValidPassword) {
          console.error("Password comparison failed.");
          throw new Error("Invalid password.");
        }

        console.log("Authentication successful!");
        return {
          id: user._id.toString(),
          email: user.email,
        };
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Attach `id` to the token
        token.email = user.email; // Attach `email` to the token
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
