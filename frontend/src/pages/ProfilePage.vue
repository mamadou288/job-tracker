<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../app/store/user.store'
import ProfileDisplay from '../features/user/components/ProfileDisplay.vue'
import ProfileForm from '../features/user/components/ProfileForm.vue'

const userStore = useUserStore()
const isEditing = ref(false)

onMounted(() => {
  userStore.fetchProfile()
})

function handleEdit() {
  isEditing.value = true
}

function handleSave() {
  isEditing.value = false
}

function handleCancel() {
  isEditing.value = false
}
</script>

<template>
  <div class="profile-page">
    <div class="page-header">
      <h1 class="page-title">Profil</h1>
    </div>

    <div class="profile-container">
      <div class="profile-card">
        <ProfileDisplay
          v-if="!isEditing"
          :profile="userStore.fullProfile"
          @edit="handleEdit"
        />
        <ProfileForm
          v-else
          :profile="userStore.fullProfile"
          @save="handleSave"
          @cancel="handleCancel"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
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

.profile-container {
  display: flex;
  justify-content: center;
}

.profile-card {
  width: 100%;
  max-width: 800px;
  padding: 2rem;
  background-color: var(--card-bg, #2d2d2d);
  border: 1px solid var(--border-color, #3d3d3d);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .profile-page {
    padding: 1rem;
  }

  .profile-card {
    padding: 1.5rem;
  }
}
</style>

