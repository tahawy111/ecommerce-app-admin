import NextAuth, { Awaitable, DefaultSession, Session, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from '@/lib/mongodb';
import { AuthOptions } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';

const adminEmails = ["amertahawy111@gmail.com", "elfathstore.ymka@gmail.com"];

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: `${process.env.GOOGLE_ID}`,
      clientSecret: `${process.env.GOOGLE_SECRET}`
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true;
      if (user.email && adminEmails.includes(user?.email)) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    }

  },
};

export default NextAuth(authOptions);

export const isAdminRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (session?.user.email && !adminEmails.includes(session.user.email)) throw new Error("Not Admin");
};