import React from "react";
import { createProfile } from "@/app/new-profile/action";

const NewProfile = () => {
    return (
        <div>
            <form action={createProfile}>
                <h1>Create your Profile</h1>
            </form>
        </div>
    );
};

export default NewProfile;
