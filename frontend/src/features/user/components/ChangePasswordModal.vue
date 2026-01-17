<script setup>
import { ref } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const errors = ref({})
const isLoading = ref(false)

function validate() {
  errors.value = {}
  
  if (!currentPassword.value.trim()) {
    errors.value.currentPassword = 'Le mot de passe actuel est requis'
  }
  
  if (!newPassword.value.trim()) {
    errors.value.newPassword = 'Le nouveau mot de passe est requis'
  } else if (newPassword.value.length < 8) {
    errors.value.newPassword = 'Le mot de passe doit contenir au moins 8 caractères'
  }
  
  if (!confirmPassword.value.trim()) {
    errors.value.confirmPassword = 'Veuillez confirmer le mot de passe'
  } else if (newPassword.value !== confirmPassword.value) {
    errors.value.confirmPassword = 'Les mots de passe ne correspondent pas'
  }
  
  return Object.keys(errors.value).length === 0
}

async function handleSave() {
  if (!validate()) return
  
  isLoading.value = true
  try {
    // TODO: Replace with actual API call
    // await userService.changePassword({
    //   currentPassword: currentPassword.value,
    //   newPassword: newPassword.value,
    // })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    handleClose()
    // Optionally show success message
  } catch (error) {
    console.error('Error changing password:', error)
    errors.value.general = 'Erreur lors du changement de mot de passe'
  } finally {
    isLoading.value = false
  }
}

function handleClose() {
  currentPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
  errors.value = {}
  emit('close')
}
</script>

<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="handleClose">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h2 class="modal-title">Changer le mot de passe</h2>
        <button class="modal-close" @click="handleClose" aria-label="Fermer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div class="modal-content">
        <div v-if="errors.general" class="error-message-general">
          {{ errors.general }}
        </div>

        <div class="modal-field">
          <label for="currentPassword" class="modal-label">Mot de passe actuel</label>
          <input
            id="currentPassword"
            v-model="currentPassword"
            type="password"
            class="modal-input"
            :class="{ 'modal-input-error': errors.currentPassword }"
            placeholder="Entrez votre mot de passe actuel"
          />
          <span v-if="errors.currentPassword" class="error-message">{{ errors.currentPassword }}</span>
        </div>

        <div class="modal-field">
          <label for="newPassword" class="modal-label">Nouveau mot de passe</label>
          <input
            id="newPassword"
            v-model="newPassword"
            type="password"
            class="modal-input"
            :class="{ 'modal-input-error': errors.newPassword }"
            placeholder="Entrez votre nouveau mot de passe"
          />
          <span v-if="errors.newPassword" class="error-message">{{ errors.newPassword }}</span>
        </div>

        <div class="modal-field">
          <label for="confirmPassword" class="modal-label">Confirmer le mot de passe</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            class="modal-input"
            :class="{ 'modal-input-error': errors.confirmPassword }"
            placeholder="Confirmez votre nouveau mot de passe"
          />
          <span v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</span>
        </div>
      </div>

      <div class="modal-footer">
        <button class="modal-button modal-button-secondary" @click="handleClose" :disabled="isLoading">
          Annuler
        </button>
        <button class="modal-button modal-button-primary" @click="handleSave" :disabled="isLoading">
          <span v-if="isLoading">Chargement...</span>
          <span v-else>Changer le mot de passe</span>
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

.error-message-general {
  padding: 0.75rem;
  background-color: rgba(239, 68, 68, 0.1);
  border: 1px solid #ef4444;
  border-radius: 6px;
  color: #ef4444;
  font-size: 0.875rem;
  margin-bottom: 1rem;
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

.modal-input {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--input-bg, #3d3d3d);
  border: 1px solid var(--border-color, #4d4d4d);
  border-radius: 6px;
  color: var(--text-primary, #ffffff);
  font-size: 0.875rem;
  font-family: inherit;
  transition: border-color 0.2s;
}

.modal-input:focus {
  outline: none;
  border-color: var(--accent-color, #646cff);
}

.modal-input-error {
  border-color: #ef4444;
}

.modal-input::placeholder {
  color: var(--text-secondary, #999);
}

.error-message {
  display: block;
  font-size: 0.75rem;
  color: #ef4444;
  margin-top: 0.25rem;
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

.modal-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.modal-button-secondary {
  background-color: var(--input-bg, #3d3d3d);
  color: var(--text-primary, #ffffff);
  border: 1px solid var(--border-color, #4d4d4d);
}

.modal-button-secondary:hover:not(:disabled) {
  background-color: #4a4a4a;
}

.modal-button-primary {
  background-color: var(--accent-color, #646cff);
  color: var(--text-primary, #ffffff);
}

.modal-button-primary:hover:not(:disabled) {
  background-color: var(--accent-hover, #535bf2);
}
</style>

