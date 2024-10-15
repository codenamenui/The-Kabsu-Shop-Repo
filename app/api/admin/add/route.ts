import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
    const { id } = await req.json();
    console.log(id);
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_KEY!
    );
    const { error } = await supabase.from("tbl_accessid").insert([{ id }]);
    return Response.json(error);
}
