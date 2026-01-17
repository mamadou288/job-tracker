<script setup>
import { useApplicationsStore } from '../app/store/applications.store';
import { STATUSES } from '../features/applications/model/statuses';
import { ref } from 'vue'
import ApplicationCard from '../features/applications/components/ApplicationCard.vue'
import ApplicationDetailModal from '../features/applications/components/ApplicationDetailModal.vue'

const company = ref('')
const title = ref('')
const selectedStatus = ref('todo')

const store = useApplicationsStore()

const selectedApplication = ref(null)
const isModalOpen = ref(false)

function openModal(application) {
  selectedApplication.value = application
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  selectedApplication.value = null
}

function submit() {
    store.addApplication({
        company: company.value,
        title: title.value,
        status: selectedStatus.value,
    })

    company.value = ''
    title.value = ''
    selectedStatus.value = 'todo'
}
</script>

<template>
  <div class="board-page">
    <div class="page-header">
      <h1 class="page-title">Board</h1>
    </div>

    <div class="add-form-container">
      <form @submit.prevent="submit" class="add-form">
        <input 
          v-model="company" 
          placeholder="Entreprise" 
          class="form-input"
          required
        />
        <input 
          v-model="title" 
          placeholder="Poste" 
          class="form-input"
          required
        />
        <select 
          v-model="selectedStatus" 
          class="form-select"
        >
          <option v-for="status in STATUSES" :key="status.key" :value="status.key">
            {{ status.label }}
          </option>
        </select>
        <button type="submit" class="form-button">Ajouter</button>
      </form>
    </div>

    <div class="board">
      <div 
        v-for="status in STATUSES" 
        :key="status.key" 
        class="board-column"
      >
        <div class="column-header">
          <h2 class="column-title">{{ status.label }}</h2>
          <span class="column-count">
            {{ store.applicationsByStatus(status.key).length }}
          </span>
        </div>
        
        <div class="column-content">
          <ApplicationCard 
            v-for="app in store.applicationsByStatus(status.key)" 
            :key="app.id" 
            :application="app"
            @click="openModal(app)"
          />
        </div>
      </div>
    </div>

    <ApplicationDetailModal
      :application="selectedApplication"
      :is-open="isModalOpen"
      @close="closeModal"
    />
  </div>
</template>

<style scoped>
.board-page {
  padding: 2rem;
  min-height: 100%;
  background-color: var(--bg-primary, #1a1a1a);
  color: var(--text-primary, #ffffff);
}

.page-header {
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary, #ffffff);
}

.add-form-container {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: var(--card-bg, #2d2d2d);
  border: 1px solid var(--border-color, #3d3d3d);
  border-radius: 8px;
}

.add-form {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
}

.form-input {
  flex: 1;
  padding: 0.75rem;
  background-color: var(--input-bg, #3d3d3d);
  border: 1px solid var(--border-color, #4d4d4d);
  border-radius: 6px;
  color: var(--text-primary, #ffffff);
  font-size: 0.875rem;
}

.form-input::placeholder {
  color: var(--text-secondary, #999);
}

.form-input:focus {
  outline: none;
  border-color: var(--accent-color, #646cff);
}

.form-select {
  flex: 0 0 auto;
  min-width: 150px;
  padding: 0.75rem;
  background-color: var(--input-bg, #3d3d3d);
  border: 1px solid var(--border-color, #4d4d4d);
  border-radius: 6px;
  color: var(--text-primary, #ffffff);
  font-size: 0.875rem;
  cursor: pointer;
}

.form-select:focus {
  outline: none;
  border-color: var(--accent-color, #646cff);
}

.form-select option {
  background-color: var(--input-bg, #3d3d3d);
  color: var(--text-primary, #ffffff);
}

.form-button {
  padding: 0.75rem 1.5rem;
  background-color: var(--accent-color, #646cff);
  color: var(--text-primary, #ffffff);
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.form-button:hover {
  background-color: var(--accent-hover, #535bf2);
}

.board {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  padding-bottom: 1rem;
}

.board-column {
  flex: 1;
  min-width: 280px;
  background-color: var(--card-bg, #2d2d2d);
  border: 1px solid var(--border-color, #3d3d3d);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 300px);
}

.column-header {
  padding: 1rem;
  border-bottom: 1px solid var(--border-color, #3d3d3d);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.column-title {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary, #999);
  margin: 0;
}

.column-count {
  font-size: 0.75rem;
  color: var(--text-secondary, #999);
  background-color: var(--input-bg, #3d3d3d);
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
}

.column-content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  min-height: 200px;
}

/* Drag and drop styles */
.column-content.sortable-ghost {
  opacity: 0.5;
}

.column-content.sortable-drag {
  opacity: 0.8;
}

/* Scrollbar styling */
.column-content::-webkit-scrollbar {
  width: 8px;
}

.column-content::-webkit-scrollbar-track {
  background: var(--input-bg, #3d3d3d);
  border-radius: 4px;
}

.column-content::-webkit-scrollbar-thumb {
  background: var(--border-color, #4d4d4d);
  border-radius: 4px;
}

.column-content::-webkit-scrollbar-thumb:hover {
  background: var(--text-secondary, #999);
}

.board::-webkit-scrollbar {
  height: 8px;
}

.board::-webkit-scrollbar-track {
  background: var(--bg-primary, #1a1a1a);
}

.board::-webkit-scrollbar-thumb {
  background: var(--border-color, #4d4d4d);
  border-radius: 4px;
}

.board::-webkit-scrollbar-thumb:hover {
  background: var(--text-secondary, #999);
}
</style>
