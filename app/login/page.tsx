"use client";

import React, { useEffect, useState } from "react";
import logInGoogle from "./actions";
import Image from "next/image";
import google_logo from "@/assets/google_logo.png";
import { useSearchParams } from "next/navigation";

const Login = () => {
    const searchParams = useSearchParams();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const error = searchParams.get("error");
        if (error) {
            setErrorMessage(error);
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await logInGoogle();
        } catch (error) {
            console.error("Error during login:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {errorMessage && (
                <div className="error-box">
                    <div>{errorMessage}</div>
                    <button
                        onClick={() => setErrorMessage("")}
                        className="button border border-black dark:invert"
                    >
                        Return
                    </button>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <button
                    type="submit"
                    className="button w-full gap-2 px-6 flex justify-center items-center"
                    disabled={isLoading}
                >
                    <Image
                        src={google_logo}
                        alt={"Google logo"}
                        width={25}
                        height={25}
                    />
                    <h5>
                        {isLoading
                            ? "Signing in...     f"
                            : "Sign in with Google"}
                    </h5>
                </button>
            </form>
        </div>
    );
};

export default Login;
