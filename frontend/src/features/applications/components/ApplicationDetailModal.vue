<script setup>
import { ref, watch } from 'vue'
import { STATUSES } from '../model/statuses'
import { useApplicationsStore } from '../../../app/store/applications.store'

const props = defineProps({
  application: {
    type: Object,
    default: null,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])

const store = useApplicationsStore()
const selectedStatus = ref('todo')

watch(() => props.application, (newApp) => {
  if (newApp) {
    selectedStatus.value = newApp.status
  }
}, { immediate: true })

function handleSave() {
  if (props.application && props.application.status !== selectedStatus.value) {
    store.updateApplicationStatus(props.application.id, selectedStatus.value)
  }
  handleClose()
}

function handleClose() {
  emit('close')
}

function formatDate(dateString) {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <div v-if="isOpen && application" class="modal-overlay" @click.self="handleClose">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h2 class="modal-title">Détails de la candidature</h2>
        <button class="modal-close" @click="handleClose" aria-label="Fermer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div class="modal-content">
        <div class="modal-field">
          <label class="modal-label">Entreprise</label>
          <div class="modal-value">{{ application.company }}</div>
        </div>

        <div class="modal-field">
          <label class="modal-label">Poste</label>
          <div class="modal-value">{{ application.title }}</div>
        </div>

        <div class="modal-field">
          <label class="modal-label">Statut</label>
          <select v-model="selectedStatus" class="modal-select">
            <option v-for="status in STATUSES" :key="status.key" :value="status.key">
              {{ status.label }}
            </option>
          </select>
        </div>

        <div class="modal-field">
          <label class="modal-label">Créé le</label>
          <div class="modal-value">{{ formatDate(application.createdAt) }}</div>
        </div>

        <div class="modal-field">
          <label class="modal-label">Modifié le</label>
          <div class="modal-value">{{ formatDate(application.updatedAt) }}</div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="modal-button modal-button-secondary" @click="handleClose">
          Annuler
        </button>
        <button class="modal-button modal-button-primary" @click="handleSave">
          Sauvegarder
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-container {
  background-color: var(--card-bg, #2d2d2d);
  border: 1px solid var(--border-color, #3d3d3d);
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color, #3d3d3d);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary, #ffffff);
}

.modal-close {
  background: none;
  border: none;
  color: var(--text-secondary, #999);
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
}

.modal-close:hover {
  background-color: var(--hover-bg, #3d3d3d);
  color: var(--text-primary, #ffffff);
}

.modal-content {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

.modal-field {
  margin-bottom: 1.5rem;
}

.modal-field:last-of-type {
  margin-bottom: 0;
}

.modal-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary, #999);
  margin-bottom: 0.5rem;
}

.modal-value {
  font-size: 0.875rem;
  color: var(--text-primary, #ffffff);
  padding: 0.75rem;
  background-color: var(--input-bg, #3d3d3d);
  border: 1px solid var(--border-color, #4d4d4d);
  border-radius: 6px;
}

.modal-select {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--input-bg, #3d3d3d);
  border: 1px solid var(--border-color, #4d4d4d);
  border-radius: 6px;
  color: var(--text-primary, #ffffff);
  font-size: 0.875rem;
  cursor: pointer;
}

.modal-select:focus {
  outline: none;
  border-color: var(--accent-color, #646cff);
}

.modal-select option {
  background-color: var(--input-bg, #3d3d3d);
  color: var(--text-primary, #ffffff);
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid var(--border-color, #3d3d3d);
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.modal-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.modal-button-secondary {
  background-color: var(--input-bg, #3d3d3d);
  color: var(--text-primary, #ffffff);
}

.modal-button-secondary:hover {
  background-color: var(--hover-bg, #4d4d4d);
}

.modal-button-primary {
  background-color: var(--accent-color, #646cff);
  color: var(--text-primary, #ffffff);
}

.modal-button-primary:hover {
  background-color: var(--accent-hover, #535bf2);
}
</style>

