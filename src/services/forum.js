const API_URL = "http://localhost:3000/forum";

export async function getQuestions() {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`Failed to fetch questions: ${res.status} ${res.statusText}`);
    return await res.json();
}

export async function postQuestion(question) {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(question)
    });
    if (!res.ok) throw new Error(`Failed to post question: ${res.status} ${res.statusText}`);
    return await res.json();
}