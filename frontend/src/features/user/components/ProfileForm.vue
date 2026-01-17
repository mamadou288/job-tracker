<script setup>
import { ref, watch } from 'vue'
import { useUserStore } from '../../../app/store/user.store'

const props = defineProps({
  profile: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['save', 'cancel'])

const store = useUserStore()

const formData = ref({
  name: props.profile.name || '',
  email: props.profile.email || '',
  phone: props.profile.phone || '',
  location: props.profile.location || '',
  bio: props.profile.bio || '',
})

watch(() => props.profile, (newProfile) => {
  formData.value = {
    name: newProfile.name || '',
    email: newProfile.email || '',
    phone: newProfile.phone || '',
    location: newProfile.location || '',
    bio: newProfile.bio || '',
  }
}, { immediate: true })

const errors = ref({})

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function validate() {
  errors.value = {}
  
  if (!formData.value.name.trim()) {
    errors.value.name = 'Le nom est requis'
  }
  
  if (!formData.value.email.trim()) {
    errors.value.email = 'L\'email est requis'
  } else if (!validateEmail(formData.value.email)) {
    errors.value.email = 'Email invalide'
  }
  
  return Object.keys(errors.value).length === 0
}

function handleSave() {
  if (validate()) {
    store.updateProfile(formData.value)
    emit('save', formData.value)
  }
}

function handleCancel() {
  // Reset form to original values
  formData.value = {
    name: props.profile.name || '',
    email: props.profile.email || '',
    phone: props.profile.phone || '',
    location: props.profile.location || '',
    bio: props.profile.bio || '',
  }
  errors.value = {}
  emit('cancel')
}
</script>

<template>
  <div class="profile-form">
    <h2 class="form-title">Modifier le profil</h2>
    
    <form @submit.prevent="handleSave" class="form">
      <div class="form-group">
        <label for="name" class="form-label">Nom complet *</label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          class="form-input"
          :class="{ 'form-input-error': errors.name }"
          placeholder="Votre nom"
          required
        />
        <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
      </div>

      <div class="form-group">
        <label for="email" class="form-label">Email *</label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          class="form-input"
          :class="{ 'form-input-error': errors.email }"
          placeholder="votre@email.com"
          required
        />
        <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label for="phone" class="form-label">Téléphone</label>
        <input
          id="phone"
          v-model="formData.phone"
          type="tel"
          class="form-input"
          placeholder="+33 6 12 34 56 78"
        />
      </div>

      <div class="form-group">
        <label for="location" class="form-label">Localisation</label>
        <input
          id="location"
          v-model="formData.location"
          type="text"
          class="form-input"
          placeholder="Paris, France"
        />
      </div>

      <div class="form-group">
        <label for="bio" class="form-label">Biographie</label>
        <textarea
          id="bio"
          v-model="formData.bio"
          class="form-textarea"
          rows="4"
          placeholder="Parlez-nous de vous..."
        ></textarea>
      </div>

      <div class="form-actions">
        <button type="button" class="button-cancel" @click="handleCancel">
          Annuler
        </button>
        <button type="submit" class="button-save">
          Sauvegarder
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.profile-form {
  width: 100%;
}

.form-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  color: var(--text-primary, #ffffff);
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary, #999);
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--input-bg, #3d3d3d);
  border: 1px solid var(--border-color, #4d4d4d);
  border-radius: 6px;
  color: var(--text-primary, #ffffff);
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--accent-color, #646cff);
}

.form-input-error {
  border-color: #ef4444;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.error-message {
  font-size: 0.75rem;
  color: #ef4444;
  margin-top: 0.25rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color, #3d3d3d);
}

.button-cancel,
.button-save {
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.button-cancel {
  background-color: var(--input-bg, #3d3d3d);
  color: var(--text-primary, #ffffff);
  border: 1px solid var(--border-color, #4d4d4d);
}

.button-cancel:hover {
  background-color: #4a4a4a;
}

.button-save {
  background-color: var(--accent-color, #646cff);
  color: var(--text-primary, #ffffff);
}

.button-save:hover {
  background-color: var(--accent-hover, #535bf2);
}
</style>

