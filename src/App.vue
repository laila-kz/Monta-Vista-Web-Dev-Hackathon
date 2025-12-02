<script setup>
import NavBar from './components/NavBar.vue';
import { ref, onMounted, onErrorCaptured } from 'vue';

const error= ref(null);
const loading = ref(true);

onMounted(async () => {
  // Simulate loading delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  loading.value = false;
});

onErrorCaptured((err, instance, info) => {
  error.value = err;
  // Log the error to an external service (e.g., Sentry)
  console.error("Error captured by ErrorBoundary:", err, info);
  // Returning false stops the error from propagating further up the component tree
  // return false; 
});


function clearError() {
  error.value = null;
}

</script>

<template>
<div id="app">
  <div v-if="loading" class="flex-center" style="min-height: 100vh">
    <div class="spinner">Loading...</div>
  </div>
  <div v-else-if="error" class="error-container">
    <div class="card">
      <h2 style="color: var(--color-error);">Oops! Something went wrong</h2>
      <p class="text-muted">{{ error.message || 'Error loading application. Please try again later.' }}</p>
      <button class="btn btn-primary" @click="clearError">Try again</button>
    </div>
  </div>
  <div v-else>
    <NavBar />
    <main class="content">
      <router-view />
    </main>
    <footer class="footer">
      <p>© 2025 MV Connect. All rights reserved.</p>
    </footer>
  </div>
</div>
</template>

<style scoped>
.error-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: var(--spacing-lg);
}

.error-container .card {
  max-width: 500px;
  text-align: center;
}

.spinner {
  font-size: 1.25rem;
  color: var(--color-primary);
  font-weight: 600;
}

.content {
  min-height: 80vh;
  padding: var(--spacing-lg);
}

.footer {
  text-align: center;
  padding: var(--spacing-lg);
  color: var(--color-text-muted);
  font-size: 0.9rem;
  border-top: 1px solid var(--color-border);
  background: var(--color-surface);
}
</style>