import { cookies } from "next/headers";
import React from "react";

const Users = async () => {
    const cookieStore = cookies();
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/view-admin`,
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
            <div className="flex flex-col gap-10">
                <div className="text-center">Admin Users</div>
                <div className="flex gap-4">
                    {data.data.map(
                        (stud: {
                            id: string;
                            tbl_student: {
                                fname: string;
                                lname: string;
                                mname: string;
                                college: string;
                                year: string;
                                program: string;
                                stud_number: string;
                            };
                        }) => {
                            return (
                                <div
                                    className="flex flex-col button"
                                    key={stud.id}
                                >
                                    <div>{stud.id}</div>
                                    <div>{stud.tbl_student.fname}</div>
                                    <div>{stud.tbl_student.lname}</div>
                                    <div>{stud.tbl_student.mname}</div>
                                    <div>{stud.tbl_student.college}</div>
                                    <div>{stud.tbl_student.program}</div>
                                    <div>{stud.tbl_student.year}</div>
                                    <div>{stud.tbl_student.stud_number}</div>
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
