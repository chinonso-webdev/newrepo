import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./dbConnect";
import user from "@/model/user";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/login",
        error: "/login", // Redirect errors back to login page
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    console.warn("Missing email or password");
                    throw new Error("Email and password are required");
                }

                try {
                    await dbConnect();
                    
                    const Newuser = await user.findOne({
                        email: credentials.email
                    });

                    if (!Newuser) {
                        console.warn(`User not found: ${credentials.email}`);
                        throw new Error("Invalid credentials");
                    }

                    if (credentials.password !== Newuser.password) {
                        console.warn(`Invalid password for user: ${credentials.email}`);
                        throw new Error("Invalid credentials");
                    }

                    // Successful login
                    console.log(`User logged in successfully: ${credentials.email}`);
                    
                    return {
                        id: Newuser._id?.toString() || Newuser.id,
                        email: Newuser.email,
                        role: Newuser.role,
                        randomKey: "The best random key",
                        image: Newuser.fullname
                    };
                } catch (error: any) {
                    console.error("Auth error:", error.message);
                    throw new Error(error.message || "Authentication failed");
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            // Additional validation can be added here
            return true;
        },
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    role: token.role,
                    randomKey: token.randomKey,
                },
            };
        },
        jwt: ({ token, user }) => {
            if (user) {
                const u = user as unknown as any;
                return {
                    ...token,
                    id: u.id,
                    role: u.role,
                    name: u.role,
                    image: u.id,
                    randomKey: u.randomKey,
                };
            }
            return token;
        },
        redirect: async ({ url, baseUrl }) => {
            // Handle redirects to ensure they stay on the correct domain
            if (url.startsWith("/")) {
                return `${baseUrl}${url}`;
            }
            // Only allow redirects to the same origin
            else if (new URL(url).origin === baseUrl) {
                return url;
            }
            return baseUrl + "/main/assetpage";
        },
    },
    secret: process.env.NEXTAUTH_SECRET || 'thisisanawesomesecret'
};
