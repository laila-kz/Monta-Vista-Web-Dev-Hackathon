<template>
  <div class="resource-card">
    <h3 class="title">{{ title }}</h3>
    <p class="file-type">{{ fileType }}</p>
    <p class="rating"> {{ rating }} / 5 </p>
    <button class="download-btn" @click="downloadResource"> Download</button>
  </div>
</template>


<script setup>
const props = defineProps({
  title: String,
  fileType: String,
  rating: Number,
  downloadUrl: String
});

function downloadResource() {
  if (props.downloadUrl) {
    window.open(props.downloadUrl, "_blank");
  } else {
    alert("No download link available!");
  }

}
</script>

<style scoped>
.resource-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-soft);
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  align-items: flex-start;
}

.resource-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.resource-card .title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-text);
}

.resource-card .file-type {
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.resource-card .rating {
  margin-top: 6px;
  font-weight: 600;
  color: var(--color-text-light);
}

.download-btn {
  margin-top: 8px;
  align-self: stretch;
  text-align: center;
  padding: 10px 12px;
  border-radius: var(--radius-md);
  background: var(--color-primary);
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 700;
  transition: var(--transition-fast);
}

.download-btn:hover { transform: scale(1.02); }
</style>
