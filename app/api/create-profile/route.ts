// /pages/api/create-profile.ts
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    const body = await req.json();
    const { studNumber, fname, lname, college, selectedProgram, studYear } =
        body;
    const authsupabase = createServerComponentClient({ cookies });
    const {
        data: { user },
        error: authError,
    } = await authsupabase.auth.getUser();

    if (authError) {
        return new Response(JSON.stringify({ error: authError.message }), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 500,
        });
    }

    const { error: databaseError } = await authsupabase
        .from("tbl_student")
        .update([
            {
                stud_number: studNumber,
                fname: fname,
                lname: lname,
                college: college,
                program: selectedProgram,
                year: studYear,
            },
        ])
        .eq("id", user.id)
        .select();

    if (databaseError) {
        return new Response(JSON.stringify({ error: databaseError.message }), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 500,
        });
    }

    return new Response(
        JSON.stringify({
            message: "Profile created successfully",
            status: "ok",
        }),
        {
            headers: {
                "Content-Type": "application/json",
            },
            status: 201,
        }
    );
}
