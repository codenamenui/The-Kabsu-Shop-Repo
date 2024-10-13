import React from "react";

const ProfileInput = ({
    property_name,
    placeholder,
    type = "text",
}: {
    property_name: string;
    placeholder: string;
    type: string;
}) => {
    return (
        <div>
            <label htmlFor={property_name}>Student Number</label>
            <input
                type={type}
                name={property_name}
                id={property_name}
                placeholder={placeholder}
                required
                className="px-2 text-black"
            />
        </div>
    );
};

export default ProfileInput;
