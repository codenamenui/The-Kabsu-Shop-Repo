import {
    createRouteHandlerClient,
    createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");

    if (code) {
        const supabase = createRouteHandlerClient({ cookies });
        const { error: codeError } = await supabase.auth.exchangeCodeForSession(
            code
        );
        // Handle error in OAuth exchange
        if (codeError) {
            // Redirect to the login page with an error message
            const redirectUrl = new URL(
                `${process.env.NEXT_PUBLIC_BASE_URL}/login`
            );
            redirectUrl.searchParams.set("error", "Authentication error!");
            return NextResponse.redirect(redirectUrl);
        }
    }

    // Fetch the authenticated user
    const supabase = createServerComponentClient({ cookies });
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();
    if (authError) {
        // If no user, redirect to login with error message
        const redirectUrl = new URL(
            `${process.env.NEXT_PUBLIC_BASE_URL}/login`
        );
        redirectUrl.searchParams.set("error", "Login failed!");
        return NextResponse.redirect(redirectUrl);
    }

    // Get user id to check if it is a new user or not
    const id = user.id;

    const { error: idError } = await supabase
        .from("tbl_student")
        .select("id")
        .eq("id", id)
        .single();

    if (idError) {
        const redirectUrl = new URL(
            `${process.env.NEXT_PUBLIC_BASE_URL}/login`
        );
        redirectUrl.searchParams.set("error", idError.message);
        return NextResponse.redirect(redirectUrl);
    }

    const {
        data: { stud_number },
        error: tblError,
    } = await supabase
        .from("tbl_student")
        .select("stud_number")
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

    if (stud_number == null) {
        return NextResponse.redirect("http://localhost:3000/new-profile");
    }
    return NextResponse.redirect("http://localhost:3000/");
}
