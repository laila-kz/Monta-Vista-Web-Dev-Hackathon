<script setup lang="ts">
import StudyGroupCard from '@/components/StudyGroupCard.vue';
import {ref, computed , onMounted} from 'vue';
import {
    getStudyGroups,
    addStudyGroup,

} from "../services/studyGroups.js";

//the data 
const groups= ref([]);
const searchTerm = ref('');
const selectedCourse = ref('');

const newGroup = ref({
    subject: '',
    description: '',
    meetingTime: '',
    location: ''
});

const courseOptions = ref(['Math 101', 'Physics 201', 'Chemistry 301', 'Biology 101']);

//load groups form the json server 
onMounted(async () => {
    groups.value = await getStudyGroups();
});

//filter the grp 
const filteredGroups= computed(()=>{
    return groups.value.filter(g=>{
        const matchesSearch = g.subject.toLowerCase().includes(searchTerm.value.toLowerCase());
        const matchesCourse = selectedCourse.value === "" || (g.course && g.course.toLowerCase().includes(selectedCourse.value.toLowerCase()));
        return matchesSearch && matchesCourse;
    });
});


//add new grp
async function addGroup() {
  const created = await addStudyGroup(newGroup.value);
    groups.value.push(created);
    newGroup.value = {
        subject: '',
        description: '',
        meetingTime: '',
        location: ''
    };
    
}

</script>

<template>
    <div class="page">
        <h1 class="title">Study Groups</h1>
        <!-- search +filter -->
        <div class="controls">
            <input v-model="searchTerm" class="search" placeholder="search groups..." />
            <select v-model="selectedCourse" class="filter">
                <option value="">All Courses</option>
                <option v-for="course in courseOptions" :key="course" :value="course">{{ course }}</option>
            </select>            
        </div>
        <!-- new grp form  -->
        <form class="form" @submit.prevent="addGroup">
            <h2> Add a new Group Study</h2>
            <input v-model="newGroup.subject" placeholder="Subject" required />
      <input v-model="newGroup.description" placeholder="Description" required />
      <input v-model="newGroup.meetingTime" placeholder="Meeting Time" required />

      <button type="submit" class="btn btn-primary">Add Group</button>
        </form>

        <!-- groups list -->
        <div class="group-list">
            <StudyGroupCard
            v-for="group in filteredGroups"
            :key="group.id"
            :subject="group.subject"
            :description="group.description"
            :meetingTime="group.meetingTime"
            :location="group.location"
            />
    </div>
      </div>

  </template>

<style scoped>
.page {
    max-width: 1000px;
    margin: 0 auto;
    padding: var(--spacing-lg);
}

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

.group-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-lg);
  align-items: start;
  justify-items: stretch;
  padding: 0;
}

/* Make each card consistent and add a subtle hover effect */
.group-list > * {
  transition: transform .12s ease, box-shadow .12s ease;
  will-change: transform;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.group-list > *:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 24px rgba(16,24,40,0.08);
}

@media (max-width: 480px) {
  .group-list { gap: var(--spacing-md); grid-template-columns: 1fr; }
}

.title { font-size: 1.75rem; margin-bottom: var(--spacing-md); }

@media (max-width: 768px) {
    .controls { flex-direction: column; align-items: stretch; }
}
</style>

