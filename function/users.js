import {BASE_BACKEND} from "./constants";

export async function getUser(token){
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

export async function createUser({email,firstname,lastname,company,token}){
    console.log("Hello", token)
    if (token === null || token === undefined || token === "") {
        return null;
    }
    const req = {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify({firstname, lastname, email, company})
    };
    const res = await fetch(BASE_BACKEND+"/users", req)
    return res.json()
}

export async function getPublicDatasets(token,keywords){
    if(token!==null){
        const req = {
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
        };
        try {
            if (keywords === undefined) {
                const res = await fetch(BASE_BACKEND+"/public/datasets?topic=", req)
                return res.json()
            }
            const res = await fetch(BASE_BACKEND+"/public/datasets?topic="+keywords, req)
            return res.json()
        } catch (e) {
            console.log("Error:", e)
            return null
        }
    }
}

export async function getPublicDatasetsTopics(token,topics){
    if(token!==null){
        const req = {
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
    };
    try {
        const res = await fetch(BASE_BACKEND+"/public/datasets/topic?topic="+topics, req)
        return res.json()
    } catch (e) {
        console.log("Error:", e)
        return null
    }
}
}

export async function getDatasets(token){
    if(token!==null){
        const req = {
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
    };
    try {
        const res = await fetch(BASE_BACKEND+"/datasets", req)
        return res.json()
    } catch (e) {
        console.log("Error:", e)
        return null
    }
    }
}

export async function getDatasetsId(token,dataset_id){
    if(token!==null){
        const req = {
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
    };
    try {
        const res = await fetch(BASE_BACKEND+"/datasets/id?dataset_id="+dataset_id, req)
        return res.json()
    } catch (e) {
        console.log("Error:", e)
        return null
    }
    }
}

export async function downloadDatasetsId(token,dataset_id){
    if(token!==null){
        const req = {
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
    };
    try {
        const res = await fetch(BASE_BACKEND+"/datasets/download?dataset_id="+dataset_id, req)
        return res.json()
    } catch (e) {
        console.log("Error:", e)
        return null
    }
    }
}

export async function createUserDataset({token, dataset}){
    const req = {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify(dataset)
    };
    const res = await fetch(BASE_BACKEND+"/datasets", req)
    return res.json()
}

export async function updateUserDataset({token, data}){
    const req = {
        method:"PUT",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify(data)
    };
    const res = await fetch(BASE_BACKEND+"/datasets", req)
    return res.json()
}

export async function deleteUserDataset({token, data}){
    const req = {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify(data)
    };
    const res = await fetch(BASE_BACKEND+"/datasets/delete", req)
    return res.json()
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