import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const logInGoogle = async () => {
    const supabase = createClientComponentClient();
    await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
        },
    });
};
