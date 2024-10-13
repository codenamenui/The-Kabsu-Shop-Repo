import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { colleges } from "@/data/profiledata";
import { redirect, RedirectType } from "next/navigation";

export const createProfile = async (formData: FormData) => {
    "use server";
    const supabase = createServerComponentClient({ cookies });

    const stud_number = formData.get("stud_number");
    const stud_fname = formData.get("fname");
    const stud_lname = formData.get("lname");
    const stud_college = formData.get("college");
    const stud_program = formData.get("program");
    const stud_year = formData.get("stud_year");

    let { data, error } = await supabase.auth.getUser();
    if (!error) {
        let { error } = await supabase
            .from("tbl_student")
            .update({
                stud_number: stud_number,
                fname: stud_fname,
                lname: stud_lname,
                college: colleges.at(parseInt(stud_college as string) - 1)
                    ?.name,
                program: stud_program,
                year: stud_year,
            })
            .eq("id", data?.user?.id)
            .select();
        if (error) {
            console.error("Error updating profile:", error.message);
        } else {
            redirect("/home");
        }
    }
};
