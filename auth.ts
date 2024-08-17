import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import {authConfig} from "@/auth.config";
import { getAccountById, getUserById } from './actions/user';


const prisma = PrismaAdapter(db)

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (token.email && session.user) {
                session.user.email = token.email;
            }
            if (token.name && session.user) {
                session.user.name = token.name;
            }
            if (token.picture && session.user) {
                session.user.image = token.picture;
            }

            return session
        },
        async jwt({ token }) {
            if (!token.sub) return token;
            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;
            const existingAccount = await getAccountById(existingUser.id)
            token.email = existingUser.email;
            token.name = existingUser.name;
            token.picture = existingUser.image;
            token.is0Auth = !!existingAccount;
            return token;
        },
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: {
                    emailVerified: new Date()
                }
            })
        }
    },
    adapter: prisma,
    session: {
        strategy: "jwt",
    },
    ...authConfig
})