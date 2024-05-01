import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/src/utils/db";
import User from "@/src/models/userModel";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      type: "credentials",
      credentials: {},
      async authorize(credentials: any): Promise<any> {
        try {
          await connectDB();
          const { email, password } = credentials;
          const user = await User.findOne({ email: email });
          if (!user) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            throw new Error("Invalid password");
          }
          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user, session, account, profile }) {
      // console.log("jwt callback ", { token, user, session, account, profile });
      if (user) {
        token._id = user._id;
        token.username = user.username;
        token.role = user.role;
        token.phone = user.phone;
        token.country = user.country;
        token.city = user.city;
        token.zipCode = user.zipCode;
        token.address = user.address;
      }

      return token;
    },
    async session({ token, session, user }) {
      // console.log("session callback ", { token, user, session });

      return {
        ...session,
        user: {
          ...session.user,
          _id: token._id,
          username: token.username,
          role: token.role,
          phone: token.phone,
          country: token.country,
          city: token.city,
          zipCode: token.zipCode,
          address: token.address,
        },
        error: token.error,
      };
    },
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};
