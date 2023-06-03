import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import env from "./env.mjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  adapter: PrismaAdapter(db),

  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_ID,
      clientSecret: env.GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    signIn: async ({ user, account, profile }) => {
      // todo: check for blacklisted emails
      if (!user.email) {
        return false;
      }
      if (account?.provider === "google" || account?.provider === "github") {
        const userExists = await db.user.findUnique({
          where: { email: user.email },
          select: { name: true },
        });
        // if the user already exists via email,
        // update the user with their name and image from Google
        if (userExists && !userExists.name) {
          await db.user.update({
            where: { email: user.email },
            data: {
              name: profile?.name,
              image: profile?.image,
            },
          });
        }
      }
      return true;
    },

    async session({ token, session, user }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },

    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
  },
  // events: {
  //   async signIn(message) {
  //     if (message.isNewUser) {
  //       const email = message.user.email as string;
  //       const user = await prisma.user.findUnique({
  //         where: { email },
  //         select: {
  //           createdAt: true,
  //         },
  //       });
  //       // only send the welcome email if the user was created in the last 10 seconds
  //       // (this is a workaround because the `isNewUser` flag is triggered when a user does `dangerousEmailAccountLinking`)
  //       if (
  //         user?.createdAt &&
  //         new Date(user.createdAt).getTime() > Date.now() - 10000
  //       ) {
  //         sendMarketingMail({
  //           subject: "Welcome to Dub.sh!",
  //           to: email,
  //           component: <WelcomeEmail />,
  //         });
  //       }
  //     }
  //   },
  pages: {
    signIn: "/auth/signin",
  },

  secret: env.NEXTAUTH_SECRET,
};
