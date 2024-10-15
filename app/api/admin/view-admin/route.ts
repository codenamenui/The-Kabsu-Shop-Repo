import { createClient } from "@supabase/supabase-js";

export async function GET() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_KEY!
    );

    const { data, error } = await supabase.from("tbl_accessid").select(`
    id, 
    tbl_student (
      fname, lname, mname, email, college, program, year, stud_number
    )
  `);
    return Response.json({ data: data, error: error });
}
