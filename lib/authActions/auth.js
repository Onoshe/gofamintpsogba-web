import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth";
//import jwt from 'jsonwebtoken';
import { findUser } from "./findUser";


export const authOptions = {
  providers: [
    CredentialsProvider({
        name: "Credentials",
        type:'credentials',
        credentials: {
          email: { label: "Email", type: "email", placeholder: "email" },
          password: { label: "Password", type: "password" },
          userName: { label: "UserName", type: "userName" },
        },
        authorize: async (credentials) => {
          const user = await findUser({userName:credentials.userName, password:credentials.password});
          if (user) {
            return user;
          } else {
            throw new Error('No user found with the given email');
          }
        },
      }),
  ],
  session: {
    strategy: 'jwt', // Use JSON Web Tokens for session management
    maxAge: 60 * 60 * 24 * 7, // 7 days (in seconds)
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 7, // 7 days (in seconds)
  },
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.firstname = user.firstname; // Add more fields here
        token.lastname = user.lastname;
        token.userId = user.userId;
        token.companyId = user.companyDomain;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.firstname = token.firstname;
      session.user.lastname = token.lastname;
      session.user.userId = token.userId;
      session.user.companyId = token.companyId;
      session.user.role = token.role;
      return session;
    },
  },
    secret: process.env.NEXT_PUBLIC_JWT_SECRET, // Ensure you have a strong secret
};

export const getAuthSession = () => getServerSession(authOptions);