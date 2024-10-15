export const createProfile = async (profileData: {
    studNumber: string;
    fname: string;
    lname: string;
    college: string;
    selectedProgram: string;
    studYear: string;
}) => {
    const res = await fetch("http://localhost:3000/api/create-profile", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
    });
    const data = await res.json();
    const status = res.status;
    return { data, status };
};
