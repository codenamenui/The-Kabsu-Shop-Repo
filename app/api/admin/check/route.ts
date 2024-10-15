import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthError, createClient, PostgrestError } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function GET() {
    const authSupabase = createServerComponentClient({ cookies });
    const {
        data: { user },
        error: authError,
    } = await authSupabase.auth.getUser();

    const ret: {
        error: null | AuthError | PostgrestError;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        message: boolean;
    } = {
        error: null,
        message: false,
    };

    if (authError) {
        console.error(authError);
        ret.error = authError;
        return Response.json(ret);
    }

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_KEY!
    );

    const { data, error: selectError } = await supabase
        .from("tbl_accessid")
        .select("id")
        .eq("id", user.id)
        .single();

    if (selectError || data == null) {
        console.error(selectError);
        ret.error = selectError;
        return Response.json(ret);
    } else {
        if (selectError) {
            console.error(selectError);
            ret.error = selectError;
            return Response.json(ret);
        }
        ret.message = true;
        return Response.json(ret);
    }
}
