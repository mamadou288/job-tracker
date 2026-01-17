<script setup>
import { useApplicationsStore } from '../app/store/applications.store';
import { useKPIStore } from '../app/store/kpi.store';
import { STATUSES } from '../features/applications/model/statuses';
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import ApplicationCard from '../features/applications/components/ApplicationCard.vue'
import ApplicationDetailModal from '../features/applications/components/ApplicationDetailModal.vue'
import KPICard from '../shared/ui/KPICard.vue'

const company = ref('')
const title = ref('')
const selectedStatus = ref('todo')

const store = useApplicationsStore()
const kpiStore = useKPIStore()
const router = useRouter()

const selectedApplication = ref(null)
const isModalOpen = ref(false)

// Calculate KPIs when component mounts or applications change
onMounted(() => {
  kpiStore.calculateKPIs()
})

watch(() => store.applications, () => {
  kpiStore.calculateKPIs()
}, { deep: true })

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
    
    // Refresh KPIs after adding application
    kpiStore.calculateKPIs()
}

function goToStatistics() {
  router.push('/statistics')
}
</script>

<template>
  <div class="board-page">
    <div class="page-header">
      <h1 class="page-title">Board</h1>
    </div>

    <!-- Add Form Section - Compact -->
    <div class="add-form-section">
      <h2 class="section-title">Ajouter une candidature</h2>
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
    </div>

    <!-- KPI Summary Section - Compact -->
    <div class="kpi-section">
      <h2 class="section-title">Statistiques</h2>
      <div class="kpi-grid">
        <KPICard
          title="Total Candidatures"
          :value="kpiStore.totalApplications"
        />
        <KPICard
          title="Taux de Réponse"
          :value="`${kpiStore.responseRate}%`"
          subtitle="Postulé + Refusé"
        />
        <KPICard
          title="Taux de Conversion"
          :value="`${kpiStore.conversionRate}%`"
          subtitle="Entretien → Offre"
        />
        <KPICard
          title="Taux de Succès"
          :value="`${kpiStore.successRate}%`"
          subtitle="Offres / Total"
        />
        <KPICard
          title="Cette Semaine"
          :value="kpiStore.recentActivity.thisWeek"
          subtitle="Nouvelles candidatures"
        />
      </div>
      <div class="kpi-actions">
        <button class="view-stats-button" @click="goToStatistics">
          Voir toutes les stats →
        </button>
      </div>
    </div>

    <!-- Board Section - Main Focus -->
    <div class="board-section">
      <h2 class="section-title">Tableau des candidatures</h2>
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
  padding: 1.5rem;
  min-height: 100%;
  background-color: var(--bg-primary, #1a1a1a);
  color: var(--text-primary, #ffffff);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.page-header {
  margin-bottom: 1rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary, #ffffff);
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  color: var(--text-primary, #ffffff);
}

.add-form-section {
  margin-bottom: 1rem;
}

.add-form-container {
  padding: 1rem;
  background-color: var(--card-bg, #2d2d2d);
  border: 1px solid var(--border-color, #3d3d3d);
  border-radius: 8px;
}

.kpi-section {
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: var(--card-bg, #2d2d2d);
  border: 1px solid var(--border-color, #3d3d3d);
  border-radius: 8px;
}

.board-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.kpi-actions {
  display: flex;
  justify-content: center;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border-color, #3d3d3d);
}

.view-stats-button {
  background: none;
  border: 1px solid var(--accent-color, #646cff);
  color: var(--accent-color, #646cff);
  padding: 0.4rem 0.875rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.view-stats-button:hover {
  background-color: var(--accent-color, #646cff);
  color: var(--text-primary, #ffffff);
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
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  flex: 1;
  min-height: 0;
  margin-top: 0.75rem;
}

.board-column {
  flex: 1;
  min-width: 250px;
  background-color: var(--card-bg, #2d2d2d);
  border: 1px solid var(--border-color, #3d3d3d);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100%;
}

.column-header {
  padding: 0.75rem;
  border-bottom: 1px solid var(--border-color, #3d3d3d);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.column-title {
  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary, #999);
  margin: 0;
}

.column-count {
  font-size: 0.6875rem;
  color: var(--text-secondary, #999);
  background-color: var(--input-bg, #3d3d3d);
  padding: 0.2rem 0.4rem;
  border-radius: 12px;
}

.column-content {
  flex: 1;
  padding: 0.75rem;
  overflow-y: auto;
  min-height: 0;
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
