<template>
    <div class="skill-trade-container">
        <h1 class="title"> Skill Trade</h1>
        <p class="subtitle"> Exchange skills and find the perfect study buddy</p>

        <section class="form-section">
            <h2>Offer a Skill</h2>
            <form @submit.prevent="submitOffer" class="offer-form">
                <input v-model="newOffer.skillOffered" type="text" placeholder="Skill you offer" required />
                <input v-model="newOffer.skillNeeded" type="text" placeholder="Skill you need" required />
                <input
          v-model="newOffer.availability"
          type="text"
          placeholder="Availability (e.g. weekends, evenings)"
        />

        <textarea
          v-model="newOffer.description"
          placeholder="Short description (optional)"
        ></textarea>

        <button type="submit" class="submit-btn btn btn-primary">Add Offer</button>

            </form>
        </section>
        <!-- matching the suggestions -->
        <section v-if="matches.length" class="matches-section">
        <h2>Suggested Matches</h2>
        <div v-for="m in matches" :key="m.id" class="match-card">
            <h3>{{ m.skillOffered }}</h3>
        <p>{{ m.description }}</p>
        <small>Needs: {{ m.skillNeeded }}</small>
        </div>
        </section>

        <!-- all offers -->
        <section class="offers-section">
      <h2>All Skill Offers</h2>

      <div
        v-for="offer in offers"
        :key="offer.id"
        class="offer-card"
      >
        <h3>{{ offer.skillOffered }}</h3>
        <p>{{ offer.description }}</p>

        <p class="info-line"><strong>Needs:</strong> {{ offer.skillNeeded }}</p>
        <p class="info-line"><strong>Availability:</strong> {{ offer.availability }}</p>
      </div>
    </section>
    </div>




</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import {
    getOffers,
    createOfferAPI,
    getMatches,
} from "../services/skills.js";

const offers= ref([]); //store offers
const matches= ref([]); //store matches

const newOffer= ref({
    skillOffered: '',
    skillNeeded: '',
    availability: '',
    description: ''
});

//fetch existing offers and matches 
async function loadSkillTradeData(){
    offers.value = await getOffers();
    matches.value = await getMatches();
}

//submit new offer
async function submitOffer() {
    await createOfferAPI(newOffer.value);
    newOffer.value = {
        skillOffered: '',
        skillNeeded: '',
        availability: '',
        description: ''
    };
    await loadSkillTradeData();
    
}

onMounted(()=>{
    loadSkillTradeData();
});


</script>

<style scoped>
.skill-trade-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: var(--spacing-lg);
}

.form-section, .matches-section, .offers-section {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--spacing-lg);
    box-shadow: var(--shadow-soft);
    margin-bottom: var(--spacing-lg);
}

.offer-form input, .offer-form textarea {
    margin-bottom: var(--spacing-sm);
}

.submit-btn {
    margin-top: var(--spacing-sm);
}

.match-card, .offer-card {
    border-radius: var(--radius-md);
    padding: var(--spacing-md);
    border: 1px solid var(--color-border);
    background: var(--color-surface);
}

.match-card + .match-card, .offer-card + .offer-card { margin-top: var(--spacing-md); }

@media (max-width: 768px) {
    .skill-trade-container { padding: var(--spacing-md); }
}
</style>

