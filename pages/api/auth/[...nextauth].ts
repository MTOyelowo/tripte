import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            wellKnown: "https://accounts.google.com/.well-known/openid-configuration",
            authorization: {
                params: { scope: "openid email profile" }
            },
            idToken: true,
            checks: ["pkce", "state"],
            async profile(profile) {
                // find out the user 
                await dbConnect()
                const oldUser = await User.findOne({ email: profile.email });
                const userProfile = {
                    email: profile.email,
                    name: profile.name,
                    image: profile.picture,
                    role: "user",
                };
                // store new user inside the db
                if (!oldUser) {
                    const newUser = new User({
                        ...userProfile,
                        provider: "google",

                    });
                    await newUser.save()
                } else {
                    userProfile.role = oldUser.role;
                }

                return { id: profile.sub, ...userProfile };
            }
        }),
    ],

    callbacks: {
        jwt({ token, user }) {

            if (user) token.role = (user as any).role;
            return token;
        },
        async session({ session }) {
            await dbConnect()
            const user = await User.findOne({ email: session.user?.email })
            if (user) session.user = {
                id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
                role: user.role,
            } as any
            return session;

        },
    },
    pages: {
        signIn: "/auth/signin",
        error: "/404",
    }
};

export default NextAuth(authOptions)