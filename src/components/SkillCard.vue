<template>
    <div class="skill-card">
       <h3 class="offered"> 
        <strong>Offering:</strong> {{ skillOffered }}
       </h3>
       <p class="needed">
      <strong>Needs:</strong> {{ skillNeeded }}
    </p>

    <p class="availability">
      <strong>Availability:</strong> {{ availability }}
    </p>

    <button class="request-btn" @click="requestTrade">
      Request Trade
    </button>
    </div>


</template>

<script setup>
const props = defineProps({
  skillOffered: String,
  skillNeeded: String,
  availability: String
});

function requestTrade() {
  alert(`Requesting trade: Offering ${props.skillOffered}, Needs ${props.skillNeeded}`);
}
</script>
