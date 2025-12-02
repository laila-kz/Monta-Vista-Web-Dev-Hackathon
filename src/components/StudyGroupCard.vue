<script setup>
const props = defineProps({
  subject: String,
  description: String,
  meetingTime: String,
  location: String
});
function joinGroup() {
  alert(`You have joined the study group for ${props.subject}!`);

  
}
</script>
<template>
  <div class="study-group-card">
    <h2 class="subject"> {{ subject }}</h2>
    <p class="description"> {{ description }}</p>
    <p class="meeting-time"> Meeting Time: {{ meetingTime }}</p>
    <p class="location"> Location: {{ location }}</p>

    <button class="join-button request-btn" @click="joinGroup">Join Group</button>
  </div>
</template>

