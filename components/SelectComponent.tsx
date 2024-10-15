import React, { ChangeEvent } from "react";
import { colleges, programs } from "@/data/profiledata";

export const SelectComponent = ({
    selectedCollege,
    selectedProgram,
    handleCollegeChange,
    handleProgramChange,
}: {
    selectedCollege: number;
    selectedProgram: string;
    handleCollegeChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    handleProgramChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}) => {
    // Filter the programs based on the selected college
    const filteredPrograms = programs.filter(
        (program) => program.collegeId === selectedCollege
    );

    return (
        <div>
            <label htmlFor="college">College: </label>
            <select
                name="college"
                id="college"
                value={selectedCollege}
                onChange={handleCollegeChange}
                className="px-2 text-black"
                required
            >
                <option value="">-- Select a College --</option>
                {colleges.map((college) => (
                    <option key={college.id} value={college.id}>
                        {college.name}
                    </option>
                ))}
            </select>
            <br />

            <label htmlFor="program">Program: </label>
            <select
                id="program"
                name="program"
                value={selectedProgram}
                onChange={handleProgramChange}
                className="px-2 text-black"
                required
            >
                <option value="">-- Select a Program --</option>
                {filteredPrograms.map((program) => (
                    <option key={program.id} value={program.name}>
                        {program.name}
                    </option>
                ))}
            </select>
            <br />
        </div>
    );
};
