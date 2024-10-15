"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import { SelectComponent } from "@/components/SelectComponent";
import { colleges } from "@/data/profiledata";
import FormInput from "@/components/ProfileInputComponent";
import { createProfile } from "@/app/new-profile/actions";
import { useRouter } from "next/navigation";

const NewProfile = () => {
    const [studNumber, setStudNumber] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [selectedCollege, setSelectedCollege] = useState<number>(-1);
    const [selectedProgram, setSelectedProgram] = useState<string>("");
    const [studYear, setStudYear] = useState<string>("");
    const [status, setStatus] = useState<number>(-1);
    const router = useRouter(); // Initialize the routSSer

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedCollege < -1 || selectedCollege >= colleges.length) {
            return;
        }
        const college = colleges[selectedCollege].name;
        const profileData = {
            studNumber,
            fname,
            lname,
            college,
            selectedProgram,
            studYear,
        };

        const { status } = await createProfile(profileData);
        setStatus(status);
    };

    useEffect(() => {
        setStatus(-1);
    }, []);

    if (status == 201) {
        router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/`);
    } else if (status == 500) {
    }

    const handleCollegeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const collegeId = parseInt(event.target.value);
        setSelectedCollege(collegeId);
        setSelectedProgram(""); // Reset the program when the college changes
    };

    const handleProgramChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedProgram(event.target.value);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="">
                <h1>Profile Information</h1>

                {/* Using the reusable FormInput component */}
                <FormInput
                    label="Student Number"
                    type="text"
                    name="stud_number"
                    id="stud_number"
                    value={studNumber}
                    placeholder="Enter student number..."
                    onChange={(e) => setStudNumber(e.target.value)}
                />

                <FormInput
                    label="First Name"
                    type="text"
                    name="fname"
                    id="fname"
                    value={fname}
                    placeholder="Enter first name..."
                    onChange={(e) => setFname(e.target.value)}
                />

                <FormInput
                    label="Last Name"
                    type="text"
                    name="lname"
                    id="lname"
                    value={lname}
                    placeholder="Enter last name..."
                    onChange={(e) => setLname(e.target.value)}
                />

                <SelectComponent
                    selectedCollege={selectedCollege}
                    selectedProgram={selectedProgram}
                    handleCollegeChange={handleCollegeChange}
                    handleProgramChange={handleProgramChange}
                />

                <label htmlFor="stud_year">Select School Year: </label>
                <select
                    id="stud_year"
                    name="stud_year"
                    value={studYear}
                    onChange={(e) => setStudYear(e.target.value)}
                    required
                    className="px-2 text-black"
                >
                    <option value="">-- Select a Year --</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                </select>
                <br />

                <button
                    type="submit"
                    className="rounded-lg p-1 bg-white text-black"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default NewProfile;
