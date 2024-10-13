"use client";

import React, { useEffect, useState } from "react";
import { logInGoogle } from "./action";
import Image from "next/image";
import google_logo from "@/assets/google_logo.png";
import { useSearchParams } from "next/navigation";

const Login = () => {
    const searchParams = useSearchParams();
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        const error = searchParams.get("error");
        if (error) {
            setErrorMessage(error);
        }
    }, [searchParams]);

    return (
        <div>
            {errorMessage && (
                <div className="error-box">
                    <div>{errorMessage}</div>
                    <button
                        onClick={() => {
                            setErrorMessage("");
                        }}
                        className="button border border-black dark:invert"
                    >
                        Return
                    </button>
                </div>
            )}
            <form onSubmit={logInGoogle}>
                <button className="button w-full gap-2 px-6 flex justify-center items-center">
                    <Image
                        src={google_logo}
                        alt={""}
                        width={25}
                        height={25}
                    ></Image>
                    <h5>Sign in with Google</h5>
                </button>
            </form>
        </div>
    );
};

export default Login;
