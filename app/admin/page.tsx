import Link from "next/link";
import React from "react";

const AdminPage = () => {
    return (
        <div>
            <div className="flex gap-6 w-screen justify-center">
                <Link href={"/admin/users"} className="button w-20">
                    View Users
                </Link>
                <Link href={"/admin/stores"} className="button w-20">
                    View Stores
                </Link>
                <Link href={"/admin/admins"} className="button w-20">
                    View Admins
                </Link>
            </div>
        </div>
    );
};

export default AdminPage;
