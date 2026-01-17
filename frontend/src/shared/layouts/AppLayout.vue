<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isSidebarCollapsed = ref(false)

function toggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

function navigateTo(path) {
  router.push(path)
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
          </div>
        </nav>
      </div>

      <!-- User Profile -->
      <div v-if="!isSidebarCollapsed" class="sidebar-footer">
        <div class="user-profile">
          <div class="user-avatar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="user-info">
            <div class="user-name">User</div>
            <div class="user-role">Job Seeker</div>
          </div>
        </div>
      </div>
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
    }

    .user-info {
    flex: 1;
    min-width: 0;
    }

    .user-name {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-primary, #ffffff);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
    overflow-y: auto;
    background-color: var(--bg-primary, #1a1a1a);
    }
</style>

