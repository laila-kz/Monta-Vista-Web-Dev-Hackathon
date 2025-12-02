<template>
    <div class="page">
<h1 class="title"> Resources</h1>
<!-- search +filters  -->
<div class="controls">
      <input
        v-model="searchTerm"
        class="search"
        placeholder="Search by title..."
      />

      <select v-model="selectedType" class="filter">
        <option value="">All File Types</option>
        <option v-for="t in fileTypes" :key="t" :value="t">
          {{ t }}
        </option>
      </select>

      <select v-model="selectedCourse" class="filter">
        <option value="">All Courses</option>
        <option v-for="c in courseOptions" :key="c" :value="c">
          {{ c }}
        </option>
      </select>
    </div>

    <!-- Upload Form -->
    <form class="form" @submit.prevent="uploadResource">
      <h2>Upload Resource</h2>

      <input v-model="newResource.title" placeholder="Title" required />

      <select v-model="newResource.fileType" required>
        <option disabled value="">File Type</option>
        <option v-for="t in fileTypes" :key="t" :value="t">
          {{ t }}
        </option>
      </select>

      <select v-model="newResource.course" required>
        <option disabled value="">Course</option>
        <option v-for="c in courseOptions" :key="c" :value="c">
          {{ c }}
        </option>
      </select>

      <input
        v-model="newResource.downloadUrl"
        placeholder="Download URL"
        required
      />

      <button type="submit" class="btn btn-primary">Upload</button>
    </form>

    <!-- Resources List -->
    <div class="resource-list">
      <ResourceCard
        v-for="r in filteredResources"
        :key="r.id"
        :title="r.title"
        :fileType="r.fileType"
        :rating="r.rating"
        :downloadUrl="r.downloadUrl"
      />
    </div>

  </div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue';
import ResourceCard from '../components/ResourceCard.vue';
import {getResources, uploadResource as uploadResourceAPI} from '../services/resources.js';

//data
const resources= ref([]);
const searchTerm= ref('');
const selectedType= ref('');
const selectedCourse= ref('');
const fileTypes= ['PDF', 'Video', 'Document', 'Image', 'Audio'];
const courseOptions= ['Math', 'Science', 'History', 'Art', 'Computer Science'];

const newResource = ref({
  title: "",
  fileType: "",
  course: "",
  rating: 5,
  downloadUrl: ""
});

//load resources on mount
onMounted(async () => {
  resources.value = await getResources();
}); 

//filtered resources
const filteredResources = computed(()=>{
    return resources.value.filter(r=>{
        const matchesSearch = r.title.toLowerCase().includes(searchTerm.value.toLowerCase());
        const matchesType =
      selectedType.value === "" || r.fileType === selectedType.value;

    const matchesCourse =
      selectedCourse.value === "" || r.course === selectedCourse.value;

    return matchesSearch && matchesType && matchesCourse;
    });
});

//upload resource

async function uploadResource(){
  const created = await uploadResourceAPI(newResource.value);
    resources.value.push(created);
    newResource.value = {
        title: "",
        fileType: "",
        course: "",
        rating: 5,
        downloadUrl: ""
    };
}

</script>
