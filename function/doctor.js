import {BASE_BACKEND} from "./constants";

export async function getUser(token){
    // const {data, error} = useSWR(`/getDoctor?&Token=${token}`, fetchAuth)

    // if (error) return null
    // if (!data) return null
    const req = {
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
    };
    try {
        const res = await fetch(BASE_BACKEND+"/users", req)
        return res.json()
    } catch (e) {
        console.log("Error:", e)
        return null
    }
}

export async function getReports({token, location}){
    const req = {
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
    };
    try {
        const res = await fetch(BASE_BACKEND+"/getCount?location="+location, req)
        return res.json()
    } catch (e) {
        console.log("Error:", e)
        return null
    }
}

export async function createDoctorProfile({token, doctor}){
    // const req = {
    //     method:"POST",
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'authorization': token
    //     },
    //     body: JSON.stringify(doctor)
    // };
    // const res = await fetch(BASE_BACKEND+"/users", req)
    // return res.json()
}

// export async function updateDoctorProfile({token, doctor}){
//     const req = {
//         method:"PUT",
//         headers: {
//             'Content-Type': 'application/json',
//             'authorization': token
//         },
//         body: JSON.stringify(doctor)
//     };
//     const res = await fetch(BASE_BACKEND+"/updateDoctor", req)
//     return res.json()
// }
