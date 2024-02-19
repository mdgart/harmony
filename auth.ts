import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import axios from 'axios';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          try {
            const response = await axios.post(process.env.HARMONY_URL+'/api/users/login', {
              email,
              password,
            }, {
              headers: {
                'Content-Type': 'application/json',
              },
            });

            // Assuming successful authentication
            if (response.data.code === 200 && response.data.message === 'success') {
              // Assume response.data.data is of type User and includes a token
              const user: User = response.data.data;
              return user;
            } else {
              return null;
            }
          } catch (error) {
            console.error('Failed to authenticate user:', error);
            return null;
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // If user object is available, it means we're signing in
      if (user) {
        token.accessToken = (user as User).token; // Save the token to the JWT
        token.id = (user as User).id; // Save the id to the JWT
        token.email = (user as User).email; // Save the email to the JWT
        token.first_name = (user as User).first_name; // Save the name to the JWT
        token.last_name = (user as User).last_name; // Save the name to the JWT
        token.is_active = (user as User).is_active; // Save the name to the JWT
        token.user_type = (user as User).user_type; // Save the name to the JWT

      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.accessToken) {
        (session.user as any).accessToken = token.accessToken; // Use 'any' to bypass TypeScript's checks
        (session.user as any).id = token.id; // Use 'any' to bypass TypeScript's checks
        (session.user as any).email = token.email; // Use 'any' to bypass TypeScript's checks
        (session.user as any).first_name = token.first_name; // Use 'any' to bypass TypeScript's checks
        (session.user as any).last_name = token.last_name; // Use 'any' to bypass TypeScript's checks
        (session.user as any).is_active = token.is_active; // Use 'any' to bypass TypeScript's checks
        (session.user as any).user_type = token.user_type; // Use 'any' to bypass TypeScript's checks
      }
      return session;
    },
  },
});