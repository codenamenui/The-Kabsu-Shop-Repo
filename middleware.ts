import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createServerComponentClient({ cookies });
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (
        req.nextUrl.pathname == "/" ||
        req.nextUrl.pathname.startsWith("/login")
    ) {
        return res;
    }

    if (authError) {
        // Redirect to the login page with an error message
        const redirectUrl = new URL(
            `${process.env.NEXT_PUBLIC_BASE_URL}/login`
        );
        redirectUrl.searchParams.set("error", "You are not logged in!");
        return NextResponse.redirect(redirectUrl);
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
