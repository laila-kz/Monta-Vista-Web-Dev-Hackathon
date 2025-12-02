

<template>
<nav class="navbar">
  <div class="navbar-content">
    <div class="navbar-logo">
      <span class="logo-icon">📚</span>
      <span class="logo-text">MV Connect</span>
    </div>
    
    <div class="search-container">
      <form @submit.prevent="handleSearch" class="search-form">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search resources, groups, skills..."
          aria-label="Search"
          class="search-input"
        />
        <button type="submit" class="search-button btn btn-primary" aria-label="Search button">
          🔍
        </button>
      </form>
    </div>

    <ul class="nav-links">
      <li><router-link to="/" class="nav-link">Home</router-link></li>
      <li><router-link to="/resources" class="nav-link">Resources</router-link></li>
      <li><router-link to="/studygroups" class="nav-link">Study Groups</router-link></li>
      <li><router-link to="/forum" class="nav-link">Forum</router-link></li>
      <li><router-link to="/skilltrade" class="nav-link">Skill Trade</router-link></li>
    </ul>
  </div>
</nav>
</template>

<script setup>
import { ref } from 'vue';
const searchQuery = ref('');
const emit = defineEmits(['search']);

const handleSearch = () => {
  emit('search', searchQuery.value);
};
</script>

<style scoped>
.navbar {
  background: var(--color-surface);
  border-bottom: 2px solid var(--color-border);
  box-shadow: var(--shadow-soft);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: var(--spacing-md) var(--spacing-lg);
}

.navbar-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-lg);
}

.navbar-logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
  transition: var(--transition);
  min-width: fit-content;
}

.navbar-logo:hover {
  transform: translateY(-2px);
}

.logo-icon {
  font-size: 1.75rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}

.search-container {
  flex: 1;
  max-width: 400px;
}

.search-form {
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;
}

.search-input {
  flex: 1;
  height: 40px;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  font-size: 0.95rem;
  transition: var(--transition-fast);
  background: var(--color-neutral);
}

.search-input:hover {
  border-color: var(--color-primary);
  background: white;
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-light);
  background: white;
}

.search-button {
  height: 40px;
  width: 40px;
  padding: 0;
  border-radius: var(--radius-lg);
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary);
  color: white;
  border: none;
  cursor: pointer;
  transition: var(--transition-fast);
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.15);
}

.search-button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
}

.search-button:active {
  transform: scale(0.95);
}

.nav-links {
  display: flex;
  gap: var(--spacing-lg);
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: nowrap;
}

.nav-links li {
  margin: 0;
}

.nav-link {
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  padding: var(--spacing-sm) var(--spacing-md);
  border-bottom: 3px solid transparent;
  transition: var(--transition-fast);
  cursor: pointer;
  display: block;
  position: relative;
}

.nav-link:hover {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}

.nav-link.router-link-active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
  font-weight: 600;
}

/* Mobile Responsive */
@media (max-width: 1024px) {
  .navbar-content {
    flex-wrap: wrap;
  }

  .search-container {
    flex: 1 1 100%;
    max-width: 100%;
    order: 3;
  }

  .nav-links {
    flex: 1 1 100%;
    order: 4;
    gap: var(--spacing-md);
  }
}

@media (max-width: 768px) {
  .navbar {
    padding: var(--spacing-md);
  }

  .navbar-content {
    gap: var(--spacing-md);
  }

  .logo-text {
    font-size: 1.25rem;
  }

  .search-container {
    flex: 1 1 100%;
    max-width: 100%;
  }

  .nav-links {
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    justify-content: center;
  }

  .nav-link {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: 0.85rem;
  }
}
</style>
