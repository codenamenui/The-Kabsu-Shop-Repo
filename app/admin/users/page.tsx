import { cookies } from "next/headers";
import React from "react";
import { handleAdd } from "@/app/admin/users/actions";

const Users = async () => {
    const cookieStore = cookies();
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/view-user`,
        {
            method: "GET",
            headers: {
                Cookie: cookieStore.toString(),
                "Content-Type": "application/json",
            },
            cache: "no-store", // or 'force-cache' if you want to cache the response
            credentials: "same-origin",
        }
    );
    const data = await (await res).json();

    if (!data.error) {
        return (
            <div className="flex flex-col gap-10 justify-center items-center">
                <div className="text-center">Users</div>
                <div className="flex gap-4 w-9/12 flex-wrap">
                    {data.data.map(
                        (stud: {
                            id: string;
                            fname: string;
                            lname: string;
                            mname: string;
                            college: string;
                            year: string;
                            program: string;
                            stud_number: string;
                        }) => {
                            return (
                                <div
                                    className="flex flex-col bg-white text-black text-center p-2"
                                    key={stud.id}
                                >
                                    <div>{stud.id}</div>
                                    <div>{stud.fname}</div>
                                    <div>{stud.lname}</div>
                                    <div>{stud.mname}</div>
                                    <div>{stud.college}</div>
                                    <div>{stud.program}</div>
                                    <div>{stud.year}</div>
                                    <div>{stud.stud_number}</div>
                                    <form action={handleAdd}>
                                        <button
                                            value={stud.id}
                                            name="id"
                                            className="button bg-green-600 text-black hover:text-black hover:bg-red-600"
                                        >
                                            add
                                        </button>
                                    </form>
                                </div>
                            );
                        }
                    )}
                </div>
                <div></div>
            </div>
        );
    }
};

export default Users;
