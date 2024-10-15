import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function createUserMiddleware(
    user: User,
    supabase: SupabaseClient
) {
    // Get user id to check if it is a new user or not
    const id = user.id;

    const {
        data: { college },
        error: tblError,
    } = await supabase
        .from("tbl_student")
        .select("college")
        .eq("id", id)
        .single();

    // Handle error in database query
    if (tblError) {
        const redirectUrl = new URL(
            `${process.env.NEXT_PUBLIC_BASE_URL}/login`
        );
        redirectUrl.searchParams.set("error", tblError.message);
        return NextResponse.redirect(redirectUrl);
    }

    if (college == null) {
        return NextResponse.next();
    }

    return NextResponse.redirect("http://localhost:3000/");
}

export async function apiMiddleware() {
    const authSupabase = createServerComponentClient({ cookies });
    const {
        data: { user },
        error: authError,
    } = await authSupabase.auth.getUser();

    if (!user || authError) {
        console.error(authError);
        return NextResponse.redirect("http://localhost:3000/login");
    }
    return NextResponse.next();
}

export async function adminMiddleware() {
    const checkPriviliege = async () => {
        const cookieStore = cookies();
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/check`,
            {
                headers: {
                    Cookie: cookieStore.toString(),
                    "Content-Type": "application/json",
                },
                cache: "no-store", // or 'force-cache' if you want to cache the response
            }
        );
        return res;
    };
    const val = checkPriviliege();
    const res = await (await val).json();
    if (!res.message) {
        return NextResponse.redirect("http://localhost:3000/login");
    }
    return NextResponse.next();
}
