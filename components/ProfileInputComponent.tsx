import React, { ChangeEvent } from "react";

interface FormInputProps {
    label: string;
    type: string;
    name: string;
    id: string;
    value: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ProfileInputComponent = ({
    label,
    type,
    name,
    id,
    value,
    placeholder,
    onChange,
}: FormInputProps) => {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                name={name}
                id={id}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                required
                className="px-2 text-black"
            />
            <br />
        </div>
    );
};

export default ProfileInputComponent;
