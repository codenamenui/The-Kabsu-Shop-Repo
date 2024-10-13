import Link from "next/link";

export default function Home() {
    return (
        <div>
            <div className="flex gap-6 w-screen justify-center">
                <Link href={"/login"} className="button w-20">
                    Login
                </Link>
                <Link href={"/admin"} className="button w-20">
                    Admin
                </Link>
                <Link href={"/store"} className="button w-20">
                    Store
                </Link>
            </div>
        </div>
    );
}
