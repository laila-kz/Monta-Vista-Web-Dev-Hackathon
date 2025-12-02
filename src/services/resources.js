const API_URL="http://localhost:3000/resources";

export async function getResources() {
    const res = await fetch(API_URL);
    return await res.json();
    
}

export async function uploadResource(resource) {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(resource)
    });
    return await res.json();
}