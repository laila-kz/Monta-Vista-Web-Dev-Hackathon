<script setup >
import QuestionCard from '@/components/QuestionCard.vue';
import {ref , computed, onMounted} from 'vue';
import { getQuestions, postQuestion } from "../services/forum.js";

//state data
const questions = ref([]);
const loading = ref(true);
const pageError = ref(null);
const searchTerm = ref('');
const selectedTopic = ref('');

const topics = ref(['Math', 'Science', 'History', 'Art', 'Computer Science']);
const newQuestion = ref({
    title: '',
    author: '',
    topic: '',
    content: ''
  ,
  votes: 0,
    answers: []
});

//load questions with local error handling so failures don't crash the whole app
async function loadQuestions() {
  loading.value = true;
  pageError.value = null;
  try {
    questions.value = await getQuestions();
  } catch (err) {
    // store a friendly message for the page instead of letting the error bubble
    pageError.value = err?.message || 'Error loading questions';
  } finally {
    loading.value = false;
  }
}

onMounted(loadQuestions);

//filtered questions
const filteredQuestions = computed(()=>{
    return questions.value.filter(q=>{
        const matchesSearch = q.title.toLowerCase().includes(searchTerm.value.toLowerCase());
        const matchesTopic = selectedTopic.value === "" || q.topic === selectedTopic.value;
        return matchesSearch && matchesTopic;
    });
});

//ask a question with error handling, update list locally when successful
async function askQuestion() {
  try {
    const created = await postQuestion(newQuestion.value);
    questions.value.push(created);
    newQuestion.value = {
      title: '',
      author: '',
      topic: '',
      content: '',
      votes: 0,
      answers: []
    };
    // If there was a page-level error earlier, refresh the list
    if (pageError.value) await loadQuestions();
  } catch (err) {
    // Show friendly error on the page instead of crashing app
    pageError.value = err?.message || 'Failed to post question';
  }
}



</script>

<template>
    <div class="forum">
      <h1 class="title">Forum</h1>
      <div v-if="loading" class="loading">Loading questions...</div>
      <div v-else-if="pageError" class="page-error">
      <p>{{ pageError }}</p>
      <button class="btn btn-outline" @click="loadQuestions">Retry</button>
      </div>
      <div v-else>
        <div class="controls">
            <input v-model="searchTerm" class="search" placeholder="Search questions..." />
            <select v-model="selectedTopic" class="filter">
                <option value="">All Topics</option>
                <option v-for="t in topics" :key="t" :value="t">{{ t }}</option>
            </select>
        </div>

        <!-- ask a question form -->
        <form class="form" @submit.prevent="askQuestion">
            <h2>ask a question</h2>
            <input v-model="newQuestion.title" placeholder="Question title" required />
                        <input v-model="newQuestion.author" placeholder="Your name " required />
            <select v-model="newQuestion.topic" required>
                <option disabled value="">Select Topic</option>
                <option v-for="t in topics" :key="t" :value="t">{{ t }}</option>
            </select>
            <textarea v-model="newQuestion.content" placeholder="Question details" required></textarea>
            <button type="submit" class="btn btn-primary">Post Question</button>
      
        </form>

        <!-- questions list -->
        <div class="question-list">
          <div v-for="q in filteredQuestions" :key="q.id">
            <QuestionCard
              :title="q.title"
              :author="q.author"
              :votes="q.votes"
              
            />
            <div class="answers" v-if="q.answers && q.answers.length">
              <h4>Answers</h4>
              <ul>
                <li v-for="a in q.answers" :key="a.id">
                  <strong>{{ a.author }}:</strong> {{ a.text }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        </div>
      </div>
</template>

<style scoped>
.forum {
  max-width: 1000px;
  margin: 0 auto;
  padding: var(--spacing-lg);
}

.forum .title {
  font-size: 2rem;
  margin-bottom: var(--spacing-md);
}

.loading, .page-error { text-align: center; margin: var(--spacing-lg) 0; }

.controls {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  align-items: center;
}

.controls .search, .controls .filter {
  padding: 10px 12px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
}

.form {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-soft);
  margin-bottom: var(--spacing-lg);
  display: grid;
  gap: var(--spacing-sm);
}

.form h2 { margin: 0 0 var(--spacing-md) 0; }

.form input, .form select, .form textarea { width: 100%; }

.question-list {
  display: grid;
  gap: var(--spacing-lg);
  margin-top: var(--spacing-md);
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  align-items: start;
}

/* style each card wrapper (works even if QuestionCard renders its own root element) */
.question-list > * {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-soft);
  transition: transform 120ms ease, box-shadow 120ms ease;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

/* subtle lift on hover/focus for better affordance */
.question-list > *:hover,
.question-list > *:focus-within {
  transform: translateY(-6px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}

/* small meta row inside cards (title/author/votes) */
.question-list .meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  color: var(--color-muted);
  font-size: 0.9rem;
}

/* ensure long titles wrap nicely */
.question-list .title {
  font-weight: 600;
  line-height: 1.25;
  margin-bottom: 6px;
  word-break: break-word;
}

/* responsive adjustments */
@media (max-width: 768px) {
  .question-list {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }
  .question-list > * {
    padding: calc(var(--spacing-md) - 4px);
  }
}

.page-error p { color: var(--color-error); margin-bottom: var(--spacing-sm); }

@media (max-width: 768px) {
  .controls { flex-direction: column; align-items: stretch; }
}
</style>
