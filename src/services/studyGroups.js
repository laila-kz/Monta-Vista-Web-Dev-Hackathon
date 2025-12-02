const API_URL =  "http://localhost:3000/studyGroups";

export async function getStudyGroups() {
    const res = await fetch(API_URL);
    return await res.json();
}

export async function addStudyGroup(group) {
    const res= await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(group)
    });
    return await res.json();
    
}

// keep old name for backwards compatibility
export { addStudyGroup as createStudyGroup };