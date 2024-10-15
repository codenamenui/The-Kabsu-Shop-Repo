import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

export default async function logInGoogle() {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
        },
    });
    if (error) {
        console.error(error);
        return;
    } else {
        redirect(data.url);
    }
}
