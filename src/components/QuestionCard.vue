<template>
  <div class="question-card">
    <h3 class="title">{{ title }}</h3>

    <p class="author">Posted by: {{ author }}</p>

    <p class="votes">👍 {{ votes }} votes</p>

    

      

      
   

    <button class="view-btn" @click="viewQuestion">View Question</button>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  author: String,
  votes: Number,
  answers: Array
})

function viewQuestion() {
  alert(`Viewing question: ${props.title}`);
}
</script>
