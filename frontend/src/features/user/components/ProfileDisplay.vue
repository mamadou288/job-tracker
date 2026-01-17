<script setup>
import { computed } from 'vue'

const props = defineProps({
  profile: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['edit'])

const formattedCreatedAt = computed(() => {
  if (!props.profile.createdAt) return 'N/A'
  return new Date(props.profile.createdAt).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})

const formattedUpdatedAt = computed(() => {
  if (!props.profile.updatedAt) return 'N/A'
  return new Date(props.profile.updatedAt).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})

function handleEdit() {
  emit('edit')
}
</script>

<template>
  <div class="profile-display">
    <div class="profile-header">
      <div class="avatar-container">
        <div v-if="profile.avatar" class="avatar-image">
          <img :src="profile.avatar" :alt="profile.name" />
        </div>
        <div v-else class="avatar-placeholder">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <div class="profile-title-section">
        <h2 class="profile-name">{{ profile.name || 'Utilisateur' }}</h2>
        <p class="profile-role">{{ profile.role || 'Job Seeker' }}</p>
      </div>
      <button class="edit-button" @click="handleEdit">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.3333 2.00004C11.5084 1.82493 11.7163 1.68606 11.9447 1.59131C12.1731 1.49655 12.4173 1.44775 12.6667 1.44775C12.916 1.44775 13.1602 1.49655 13.3886 1.59131C13.617 1.68606 13.8249 1.82493 14 2.00004C14.1751 2.17515 14.314 2.38305 14.4087 2.61144C14.5035 2.83984 14.5523 3.08405 14.5523 3.33337C14.5523 3.5827 14.5035 3.82691 14.4087 4.0553C14.314 4.2837 14.1751 4.4916 14 4.66671L5.00001 13.6667L1.33334 14.6667L2.33334 11L11.3333 2.00004Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Modifier
      </button>
    </div>

    <div class="profile-content">
      <div class="info-section">
        <div class="info-item">
          <span class="info-label">Email</span>
          <span class="info-value">{{ profile.email || 'Non renseigné' }}</span>
        </div>

        <div v-if="profile.phone" class="info-item">
          <span class="info-label">Téléphone</span>
          <span class="info-value">{{ profile.phone }}</span>
        </div>

        <div v-if="profile.location" class="info-item">
          <span class="info-label">Localisation</span>
          <span class="info-value">{{ profile.location }}</span>
        </div>

        <div v-if="profile.bio" class="info-item info-item-bio">
          <span class="info-label">Biographie</span>
          <p class="info-value-bio">{{ profile.bio }}</p>
        </div>
      </div>

      <div class="metadata-section">
        <div class="metadata-item">
          <span class="metadata-label">Membre depuis</span>
          <span class="metadata-value">{{ formattedCreatedAt }}</span>
        </div>
        <div class="metadata-item">
          <span class="metadata-label">Dernière mise à jour</span>
          <span class="metadata-value">{{ formattedUpdatedAt }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-display {
  width: 100%;
}

.profile-header {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-color, #3d3d3d);
}

.avatar-container {
  flex-shrink: 0;
}

.avatar-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  background-color: var(--input-bg, #3d3d3d);
}

.avatar-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: var(--input-bg, #3d3d3d);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary, #999);
}

.profile-title-section {
  flex: 1;
  min-width: 0;
}

.profile-name {
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: var(--text-primary, #ffffff);
}

.profile-role {
  font-size: 1rem;
  color: var(--text-secondary, #999);
  margin: 0;
}

.edit-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background-color: var(--accent-color, #646cff);
  color: var(--text-primary, #ffffff);
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.edit-button:hover {
  background-color: var(--accent-hover, #535bf2);
}

.profile-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-item-bio {
  margin-top: 0.5rem;
}

.info-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary, #999);
}

.info-value {
  font-size: 1rem;
  color: var(--text-primary, #ffffff);
}

.info-value-bio {
  font-size: 1rem;
  color: var(--text-primary, #ffffff);
  line-height: 1.6;
  white-space: pre-wrap;
  margin: 0;
}

.metadata-section {
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color, #3d3d3d);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.metadata-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.metadata-label {
  font-size: 0.875rem;
  color: var(--text-secondary, #999);
}

.metadata-value {
  font-size: 0.875rem;
  color: var(--text-primary, #ffffff);
}
</style>

