<template>
    <div class=home-wrapper>
      <div class=home-container>
        <div class=hero-section>
          <div class=hero-icon></div>
          <h1 class=title>Welcome to MV Virtual Study Center</h1>
          <p class=subtitle>Your Learning Community Awaits</p>
          
          <p class=description>
            MV Connect is a student-powered platform where learners can collaborate,
            share resources, join study groups, ask questions, and exchange skills.
            Everything you need to level up your learning  all in one place.
          </p>

          <div class=features>
            <div class=feature-item>
              <span class=feature-icon></span>
              <span class=feature-text>Share Resources</span>
            </div>
            <div class=feature-item>
              <span class=feature-icon></span>
              <span class=feature-text>Study Groups</span>
            </div>
            <div class=feature-item>
              <span class=feature-icon></span>
              <span class=feature-text>Ask Questions</span>
            </div>
            <div class=feature-item>
              <span class=feature-icon></span>
              <span class=feature-text>Exchange Skills</span>
            </div>
          </div>
        </div>

        <div class=button-grid>
          <RouterLink to=/studygroups class=nav-btn btn btn-primary>
            <span class=btn-icon></span>
            Study Groups
          </RouterLink>
          <RouterLink to=/resources class=nav-btn btn btn-outline>
            <span class=btn-icon></span>
            Resources
          </RouterLink>
          <RouterLink to=/forum class=nav-btn btn btn-outline>
            <span class=btn-icon></span>
            Forum
          </RouterLink>
          <RouterLink to=/skilltrade class=nav-btn btn btn-outline>
            <span class=btn-icon></span>
            Skill Trade
          </RouterLink>
        </div>

        <div class=cta-section>
          <p class=cta-text>Ready to start collaborating? Join hundreds of students learning together!</p>
          <div class=cta-buttons>
            <RouterLink to=/resources class=btn btn-secondary>Explore Now</RouterLink>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.home-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
  background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 50%, #EEF2FF 100%);
}

.home-container {
  width: 100%;
  max-width: 900px;
  text-align: center;
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-section {
  margin-bottom: var(--spacing-2xl);
}

.hero-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: var(--spacing-lg);
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.title {
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: var(--spacing-md);
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -1px;
  line-height: 1.1;
}

.subtitle {
  font-size: 1.5rem;
  color: var(--color-primary);
  font-weight: 600;
  margin-bottom: var(--spacing-lg);
  letter-spacing: 0.5px;
}

.description {
  color: var(--color-text-light);
  font-size: 1.1rem;
  margin-bottom: var(--spacing-xl);
  line-height: 1.8;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  letter-spacing: 0.3px;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
  padding: var(--spacing-xl);
  background: white;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-soft);
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  transition: var(--transition);
}

.feature-item:hover {
  transform: translateY(-4px);
}

.feature-icon {
  font-size: 2.5rem;
  transition: var(--transition);
}

.feature-item:hover .feature-icon {
  transform: scale(1.15);
}

.feature-text {
  font-weight: 600;
  color: var(--color-text);
  font-size: 0.95rem;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
  padding: var(--spacing-xl);
  background: white;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-soft);
}

.nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  padding: 18px 24px;
  border-radius: var(--radius-lg);
  text-decoration: none;
  font-weight: 600;
  font-size: 1.05rem;
  transition: var(--transition);
  cursor: pointer;
  border: none;
  min-height: 60px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.nav-btn.btn-primary {
  background: linear-gradient(135deg, var(--color-primary) 0%, #5B4FD9 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(79, 70, 229, 0.2);
}

.nav-btn.btn-primary:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(79, 70, 229, 0.35);
}

.nav-btn.btn-outline {
  background: white;
  border: 2px solid var(--color-border);
  color: var(--color-text);
}

.nav-btn.btn-outline:hover {
  border-color: var(--color-primary);
  background: var(--color-primary-light);
  color: var(--color-primary);
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(79, 70, 229, 0.15);
}

.btn-icon {
  font-size: 1.5rem;
}

.cta-section {
  padding: var(--spacing-xl);
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  color: white;
}

.cta-text {
  font-size: 1.2rem;
  margin-bottom: var(--spacing-lg);
  color: white;
  font-weight: 500;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
}

.cta-buttons .btn {
  background: white;
  color: var(--color-primary);
  font-weight: 700;
  padding: 12px 32px;
  border-radius: var(--radius-lg);
  transition: var(--transition);
}

.cta-buttons .btn:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .title {
    font-size: 2.8rem;
  }

  .subtitle {
    font-size: 1.25rem;
  }

  .hero-icon {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .home-wrapper {
    padding: var(--spacing-md);
  }

  .home-container {
    max-width: 100%;
  }

  .title {
    font-size: 2.2rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .description {
    font-size: 1rem;
  }

  .hero-icon {
    font-size: 2.5rem;
  }

  .features {
    grid-template-columns: repeat(2, 1fr);
    padding: var(--spacing-lg);
    gap: var(--spacing-md);
  }

  .feature-icon {
    font-size: 2rem;
  }

  .button-grid {
    grid-template-columns: 1fr;
    padding: var(--spacing-lg);
  }

  .nav-btn {
    min-height: 52px;
    font-size: 1rem;
  }

  .cta-section {
    padding: var(--spacing-lg);
  }

  .cta-text {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.8rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .features {
    grid-template-columns: 1fr;
  }

  .feature-icon {
    font-size: 1.75rem;
  }

  .hero-icon {
    font-size: 2rem;
  }

  .btn-icon {
    font-size: 1.25rem;
  }
}
</style>
