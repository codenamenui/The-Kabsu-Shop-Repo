import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
    adminMiddleware,
    apiMiddleware,
    createUserMiddleware,
} from "@/config/middleware";

const URLS: string[] = ["/login", "/api/auth/callback"];

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createServerComponentClient({ cookies });
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (req.nextUrl.pathname.startsWith("/api")) {
        return apiMiddleware();
    }

    if (req.nextUrl.pathname.startsWith("/admin")) {
        return adminMiddleware();
    }

    if (req.nextUrl.pathname.startsWith("/new-profile")) {
        return createUserMiddleware(user, supabase);
    }
    if (
        req.nextUrl.pathname == "/" ||
        URLS.some((e) => {
            return req.nextUrl.pathname.startsWith(e);
        }) ||
        true
    ) {
        return res;
    }
    return res;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};
