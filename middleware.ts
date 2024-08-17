import { NextRequest } from "next/server";
import {
    apiAuthPrefix,
    authRoutes,
    DEFAULT_LOGIN_REDIRECT,
    publicRoutes,
} from "@/routes";
import NextAuth, { Session } from "next-auth";
import { authConfig } from "@/auth.config";

const { auth: middleware } = NextAuth(authConfig);

export default middleware(
    (req: NextRequest & { auth: Session | null }): Response | void => {
        const { nextUrl } = req;
        const isLoggedIn = !!req.auth;
        const searchParams = new URLSearchParams()
        const callbackUrl = searchParams.get("callbackUrl")
        const pathname = nextUrl.pathname

        const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
        const isPublicRoute = publicRoutes.some((route) => {
            if (route === "/") {
                return nextUrl.pathname === route;
            } else {
                return nextUrl.pathname.startsWith(route);
            }
        });

        const isAuthRoute = authRoutes.includes(nextUrl.pathname);


        if (isAuthRoute) {
            if (isLoggedIn) {
                return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
            }
            return;
        }

        if (!isLoggedIn && !isPublicRoute) {
            return Response.redirect(new URL(`/auth/login?callbackUrl=${pathname}`, nextUrl));
        }

        return;
    },
);

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next|api).*)", "/"],
};