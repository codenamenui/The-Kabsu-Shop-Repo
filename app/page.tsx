"use client";

import Link from "next/link";
import { checkPriviliege } from "./actions";
import { useEffect, useState } from "react";

export default function Home() {
    const [adminAccess, setAdminAccess] = useState<boolean>(false);

    useEffect(() => {
        const checkPriv = async () => {
            const val = checkPriviliege();
            const res = await (await val).json();
            setAdminAccess(res.message);
        };
        checkPriv();
    }, []);

    return (
        <div>
            <div className="flex gap-6 w-screen justify-center">
                <Link href={"/login"} className="button w-20">
                    Login
                </Link>
                {adminAccess && (
                    <Link href={"/admin"} className="button w-20">
                        Admin
                    </Link>
                )}
                <Link href={"/store"} className="button w-20">
                    Store
                </Link>
            </div>
        </div>
    );
}
