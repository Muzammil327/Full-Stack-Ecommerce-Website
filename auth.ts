import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDB from "@/src/utils/db";
import User from "@/src/models/userModel";
import bcrypt from "bcrypt";

interface ErrorOptions {
  message?: string;
  cause?: Record<string, unknown> & { err: Error };
  stack?: string;
  type?: string;
}

class AuthError extends Error {
  cause?: Record<string, unknown> & { err: Error };
  type: string;

  constructor(message?: string | ErrorOptions, errorOptions?: ErrorOptions) {
    if (typeof message === "string") {
      super(message);
      this.message = message;
      this.type = errorOptions?.type || "AuthError";
    } else if (typeof message === "object") {
      super(message?.message || "Error");
      this.cause = message?.cause;
      this.stack = message?.stack;
      this.type = message?.type || "AuthError";
    } else {
      super("Error");
      this.type = "AuthError";
    }

    this.name = "AuthError";
  }
}

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid email or password";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      id: "credentials",
      name: "credentials",
      credentials: {},
      async authorize(credentials: any): Promise<any> {
        try {
          await connectDB();

          const email = credentials?.email;
          const password = credentials?.password;

          if (!email || !password) {
            // throw new AuthError("Invalid User", {
            //   type: "InvalidUser",
            // });
            // throw new Error("hello");
            throw new InvalidLoginError();
          }

          // const user = await User.findOne({ email }).select("+password");
          // if (user.emailVerified !== true) {
          //   throw new AuthError("User not found", {
          //     type: "NotUserFound",
          //   });
          // }

          // const passwordMatch = await bcrypt.compare(password, user.password);
          // if (!passwordMatch) {
          //   throw new InvalidLoginError();
          // }

          // return {
          //   _id: user._id,
          //   username: user.username,
          //   email: user.email,
          //   role: user.role,
          //   emailVerified: user.emailVerified,
          // };
          return;
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
    async jwt({ token, user, session, account, trigger }) {
      if (
        trigger === "update" &&
        session?.phone &&
        session?.address &&
        session?.city &&
        session?.zipCode &&
        session?.country &&
        session?.role &&
        session?.username
      ) {
        token.username = session.username;
        token.role = session.role;
        token.phone = session.phone;
        token.country = session.country;
        token.city = session.city;
        token.zipCode = session.zipCode;
        token.address = session.address;
        token.emailVerified = session.emailVerified;
      }
      if (user) {
        token._id = user._id;
        token.username = user.username;
        token.email = user.email;
        token.role = user.role;
        token.emailVerified = user.emailVerified;
      }
      token.exp = Math.floor(Date.now() / 1000) + 1800;
      return token;
    },
    async session({ session, token }) {
      session.user._id = token._id as string;
      session.user.name = token.username as string;
      session.user.role = token.role as string;
      session.user.phone = token.phone as string;
      session.user.country = token.country as string;
      session.user.city = token.city as string;
      session.user.zipCode = token.zipCode as string;
      session.user.address = token.address as string;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // 30 minutes
  },
  secret: process.env.JWT_SECRET,
});
