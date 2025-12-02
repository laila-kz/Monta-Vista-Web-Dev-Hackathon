const API_URL = "http://localhost:3000/skills";

export async function getOffers() {
	const res = await fetch(API_URL);
	return await res.json();
}

export async function getMatches() {
	// For now return all skills; backend can provide matching logic later
	const res = await fetch(API_URL);
	return await res.json();
}

export async function createOfferAPI(offer) {
	const res = await fetch(API_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(offer)
	});
	return await res.json();
}

export default API_URL;

