// =============================================================
// ShopBook - NextAuth Configuration (JWT Strategy)
// =============================================================

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email và mật khẩu là bắt buộc");
                }

                // Lazy import prisma to avoid build-time initialization
                const { default: prisma } = await import("./prisma");

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email, deletedAt: null },
                });

                if (!user) {
                    throw new Error("Tài khoản không tồn tại");
                }

                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) {
                    throw new Error("Mật khẩu không chính xác");
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as unknown as { id: string; role: string }).id = token.id as string;
                (session.user as unknown as { id: string; role: string }).role = token.role as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
