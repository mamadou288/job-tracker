<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../app/store/user.store'
import ChangePasswordModal from '../../features/user/components/ChangePasswordModal.vue'

const router = useRouter()
const userStore = useUserStore()
const isSidebarCollapsed = ref(false)
const isPasswordModalOpen = ref(false)

onMounted(() => {
  userStore.fetchProfile()
})

function toggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

function navigateTo(path) {
  router.push(path)
}

function goToProfile(e) {
  e.stopPropagation()
  navigateTo('/profile')
}

function openPasswordModal(e) {
  e.stopPropagation()
  isPasswordModalOpen.value = true
}

function closePasswordModal() {
  isPasswordModalOpen.value = false
}
</script>

<template>
  <div class="app-layout">
    <!-- Sidebar -->
    <aside :class="['sidebar', { collapsed: isSidebarCollapsed }]">
      <div class="sidebar-header">
        <button class="menu-toggle" @click="toggleSidebar" aria-label="Toggle sidebar">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 5H17.5M2.5 10H17.5M2.5 15H17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
        <h2 v-if="!isSidebarCollapsed" class="app-title">Job Tracker</h2>
      </div>

      <div v-if="!isSidebarCollapsed" class="sidebar-content">
        <!-- Search Bar -->
        <div class="search-container">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="search-icon">
            <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 14L11.1 11.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <input type="text" placeholder="Search" class="search-input" />
        </div>

        <!-- Navigation -->
        <nav class="sidebar-nav">
          <div class="nav-section">
            <button 
              class="nav-item" 
              :class="{ active: $route.path === '/' }"
              @click="navigateTo('/')"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 4L8 1L14 4V13C14 13.5304 13.7893 14.0391 13.4142 14.4142C13.0391 14.7893 12.5304 15 12 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 15V8H10V15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Board</span>
            </button>
            <button 
              class="nav-item" 
              :class="{ active: $route.path === '/statistics' }"
              @click="navigateTo('/statistics')"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2V14H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11 6L8 9L6 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Statistiques</span>
            </button>
          </div>
        </nav>
      </div>

      <!-- User Profile -->
      <div v-if="!isSidebarCollapsed" class="sidebar-footer">
        <div class="user-profile">
          <div class="user-avatar">
            <img v-if="userStore.avatar" :src="userStore.avatar" :alt="userStore.name" class="avatar-img" />
            <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="user-info-container">
            <div class="user-info-row">
              <span class="user-name" @click="goToProfile" role="button" tabindex="0" @keyup.enter="goToProfile">
                {{ userStore.name || 'User' }}
              </span>
              <button 
                class="settings-button" 
                @click="openPasswordModal"
                aria-label="Changer le mot de passe"
                title="Changer le mot de passe"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.01131 9.77251C4.28062 9.5799 4.48568 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15V15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
            <div class="user-role">{{ userStore.role || 'Job Seeker' }}</div>
          </div>
        </div>
      </div>

      <ChangePasswordModal
        :is-open="isPasswordModalOpen"
        @close="closePasswordModal"
      />
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
    .app-layout {
    display: flex;
    height: 100vh;
    overflow: hidden;
    background-color: var(--bg-primary, #1a1a1a);
    color: var(--text-primary, #ffffff);
    }

    .sidebar {
    width: 280px;
    background-color: var(--sidebar-bg, #2d2d2d);
    display: flex;
    flex-direction: column;
    transition: width 0.3s ease;
    border-right: 1px solid var(--border-color, #3d3d3d);
    }

    .sidebar.collapsed {
    width: 60px;
    }

    .sidebar-header {
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    border-bottom: 1px solid var(--border-color, #3d3d3d);
    }

    .menu-toggle {
    background: none;
    border: none;
    color: var(--text-primary, #ffffff);
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: background-color 0.2s;
    }

    .menu-toggle:hover {
    background-color: var(--hover-bg, #3d3d3d);
    }

    .app-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
    color: var(--text-primary, #ffffff);
    }

    .sidebar-content {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
    }

    .search-container {
    position: relative;
    margin-bottom: 1.5rem;
    }

    .search-icon {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-secondary, #999);
    pointer-events: none;
    }

    .search-input {
    width: 100%;
    padding: 0.5rem 0.75rem 0.5rem 2.5rem;
    background-color: var(--input-bg, #3d3d3d);
    border: 1px solid var(--border-color, #4d4d4d);
    border-radius: 6px;
    color: var(--text-primary, #ffffff);
    font-size: 0.875rem;
    }

    .search-input::placeholder {
    color: var(--text-secondary, #999);
    }

    .search-input:focus {
    outline: none;
    border-color: var(--accent-color, #646cff);
    }

    .sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    }

    .nav-section {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    }

    .nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    background: none;
    border: none;
    color: var(--text-secondary, #999);
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.2s;
    text-align: left;
    font-size: 0.875rem;
    }

    .nav-item:hover {
    background-color: var(--hover-bg, #3d3d3d);
    color: var(--text-primary, #ffffff);
    }

    .nav-item.active {
    background-color: var(--accent-color, #646cff);
    color: var(--text-primary, #ffffff);
    }

    .nav-item svg {
    flex-shrink: 0;
    }

    .sidebar-footer {
    padding: 1rem;
    border-top: 1px solid var(--border-color, #3d3d3d);
    }

    .user-profile {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem;
    border-radius: 6px;
    }

    .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--input-bg, #3d3d3d);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary, #999);
    overflow: hidden;
    flex-shrink: 0;
    }

    .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    }

    .user-info-container {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    }

    .user-info-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    }

    .user-name {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-primary, #ffffff);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    transition: color 0.2s;
    flex: 1;
    min-width: 0;
    }

    .user-name:hover {
    color: var(--accent-color, #646cff);
    }

    .settings-button {
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
    flex-shrink: 0;
    }

    .settings-button:hover {
    background-color: var(--hover-bg, #3d3d3d);
    color: var(--text-primary, #ffffff);
    }

    .user-role {
    font-size: 0.75rem;
    color: var(--text-secondary, #999);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    }

    .main-content {
    flex: 1;
    overflow: hidden;
    background-color: var(--bg-primary, #1a1a1a);
    display: flex;
    flex-direction: column;
    }
</style>

