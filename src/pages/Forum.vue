<script setup>
import QuestionCard from '@/components/QuestionCard.vue';
import { ref, computed, onMounted } from 'vue';
import { getQuestions, postQuestion } from '../services/forum.js';

// State
const questions = ref([]);
const loading = ref(true);
const pageError = ref(null);
const searchTerm = ref('');
const selectedTopic = ref('');

const topics = ref([
  'Math',
  'Science',
  'History',
  'Art',
  'Computer Science'
]);

const newQuestion = ref({
  title: '',
  author: '',
  topic: '',
  content: '',
  votes: 0,
  answers: []
});

async function loadQuestions() {
  loading.value = true;
  pageError.value = null;

  try {
    const data = await getQuestions();
    questions.value = Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('Error loading questions:', err);
    pageError.value = err?.message || 'Error loading questions';
    questions.value = [];
  } finally {
    loading.value = false;
  }
}

onMounted(loadQuestions);

const filteredQuestions = computed(() => {
  return (questions.value || []).filter((q) => {
    const title = (q?.title || '').toLowerCase();

    const matchesSearch = title.includes(
      searchTerm.value.toLowerCase()
    );

    const matchesTopic =
      selectedTopic.value === '' ||
      q?.topic === selectedTopic.value;

    return matchesSearch && matchesTopic;
  });
});

async function askQuestion() {
  try {
    // Basic client-side normalization (prevents posting empty payload)
    const payload = {
      title: (newQuestion.value.title || '').trim(),
      author: (newQuestion.value.author || '').trim(),
      topic: (newQuestion.value.topic || '').trim(),
      content: (newQuestion.value.content || '').trim(),
      votes: 0,
      answers: []
    };

    if (!payload.title || !payload.author || !payload.topic || !payload.content) {
      pageError.value = 'Please fill out title, author, topic, and content.';
      return;
    }

    const created = await postQuestion(payload);

    questions.value.push(
      created || {
        id: Date.now(),
        ...payload
      }
    );

    newQuestion.value = {
      title: '',
      author: '',
      topic: '',
      content: '',
      votes: 0,
      answers: []
    };

    pageError.value = null;
  } catch (err) {
    console.error('Error posting question:', err);
    pageError.value =
      err?.message || 'Failed to post question';
  }
}
</script>

<template>
  <main class="forum-page">
    <header class="forum-header">
      <h1>Forum</h1>
      <p class="muted">Ask questions, share knowledge, and collaborate.</p>
    </header>

    <section class="forum-controls">
      <div class="control">
        <label class="label" for="search">Search</label>
        <input
          id="search"
          v-model="searchTerm"
          type="text"
          class="input"
          placeholder="Search by title..."
        />
      </div>

      <div class="control">
        <label class="label" for="topic">Topic</label>
        <select id="topic" v-model="selectedTopic" class="select">
          <option value="">All topics</option>
          <option v-for="t in topics" :key="t" :value="t">{{ t }}</option>
        </select>
      </div>
    </section>

    <section class="forum-questions">
      <div v-if="loading" class="status">Loading questions...</div>
      <div v-else-if="pageError" class="status status-error">{{ pageError }}</div>
      <div v-else-if="filteredQuestions.length === 0" class="status">
        No questions found.
      </div>

      <div v-else class="questions-list">
        <QuestionCard
          v-for="q in filteredQuestions"
          :key="q.id || q._id || q.title"
          :question="q"
        />
      </div>
    </section>

    <section class="forum-ask">
      <h2>Ask a question</h2>

      <form class="ask-form" @submit.prevent="askQuestion">
        <div class="grid">
          <div class="field">
            <label class="label" for="title">Title</label>
            <input id="title" v-model="newQuestion.title" class="input" required />
          </div>

          <div class="field">
            <label class="label" for="author">Author</label>
            <input id="author" v-model="newQuestion.author" class="input" required />
          </div>

          <div class="field">
            <label class="label" for="topic2">Topic</label>
            <select id="topic2" v-model="newQuestion.topic" class="select" required>
              <option value="" disabled>Select a topic</option>
              <option v-for="t in topics" :key="t" :value="t">{{ t }}</option>
            </select>
          </div>
        </div>

        <div class="field">
          <label class="label" for="content">Content</label>
          <textarea
            id="content"
            v-model="newQuestion.content"
            class="textarea"
            rows="6"
            required
          ></textarea>
        </div>

        <button type="submit" class="btn btn-primary">Post Question</button>
      </form>
    </section>
  </main>
</template>

<style scoped>
.forum-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px;
}

.forum-header h1 {
  margin: 0;
  font-size: 2rem;
}

.muted {
  color: rgba(255, 255, 255, 0.75);
  margin-top: 6px;
}

.forum-controls {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin: 18px 0;
}

.control {
  flex: 1;
  min-width: 240px;
}

.label {
  display: block;
  font-size: 0.9rem;
  margin-bottom: 6px;
  color: rgba(255, 255, 255, 0.85);
}

.input,
.select,
.textarea {
  width: 100%;
  border: 2px solid var(--color-border);
  background: var(--color-neutral);
  color: var(--color-text);
  border-radius: var(--radius-lg);
  padding: 10px 12px;
  font-size: 0.95rem;
}

.input:focus,
.select:focus,
.textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-light);
}

.questions-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.status {
  padding: 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
}

.status-error {
  border-color: rgba(239, 68, 68, 0.5);
  color: rgba(255, 255, 255, 0.95);
}

.forum-ask {
  margin-top: 28px;
}

.ask-form {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.textarea {
  resize: vertical;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>

