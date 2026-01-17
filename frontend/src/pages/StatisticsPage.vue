<script setup>
import { useKPIStore } from '../app/store/kpi.store';
import { useApplicationsStore } from '../app/store/applications.store';
import { STATUSES } from '../features/applications/model/statuses';
import { onMounted, watch } from 'vue'
import KPICard from '../shared/ui/KPICard.vue'
import ChartPlaceholder from '../shared/ui/ChartPlaceholder.vue'

const kpiStore = useKPIStore()
const applicationsStore = useApplicationsStore()

onMounted(() => {
  kpiStore.calculateKPIs()
})

// Watch for changes in applications and recalculate KPIs
watch(() => applicationsStore.applications, () => {
  kpiStore.calculateKPIs()
}, { deep: true })
</script>

<template>
  <div class="statistics-page">
    <div class="page-header">
      <h1 class="page-title">Statistiques</h1>
    </div>

    <!-- KPI Overview Section -->
    <section class="stats-section">
      <h2 class="section-title">Vue d'ensemble</h2>
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
        <KPICard
          title="Ce Mois"
          :value="kpiStore.recentActivity.thisMonth"
          subtitle="Nouvelles candidatures"
        />
      </div>
    </section>

    <!-- Status Distribution Section -->
    <section class="stats-section">
      <h2 class="section-title">Répartition par Statut</h2>
      <div class="chart-container">
        <ChartPlaceholder
          type="bar"
          :data="kpiStore.statusDistribution"
        />
      </div>
      <div class="status-breakdown">
        <div
          v-for="status in STATUSES"
          :key="status.key"
          class="status-item"
        >
          <div class="status-label">{{ status.label }}</div>
          <div class="status-value">{{ kpiStore.statusDistribution[status.key] || 0 }}</div>
        </div>
      </div>
    </section>

    <!-- Activity Timeline Section -->
    <section class="stats-section">
      <h2 class="section-title">Activité Récente</h2>
      <div class="chart-container">
        <ChartPlaceholder
          type="line"
          :data="{
            thisWeek: kpiStore.recentActivity.thisWeek,
            thisMonth: kpiStore.recentActivity.thisMonth,
          }"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.statistics-page {
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

.stats-section {
  margin-bottom: 3rem;
  padding: 1.5rem;
  background-color: var(--card-bg, #2d2d2d);
  border: 1px solid var(--border-color, #3d3d3d);
  border-radius: 8px;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  color: var(--text-primary, #ffffff);
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.chart-container {
  background-color: var(--input-bg, #3d3d3d);
  border: 1px solid var(--border-color, #4d4d4d);
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-breakdown {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.status-item {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: var(--input-bg, #3d3d3d);
  border: 1px solid var(--border-color, #4d4d4d);
  border-radius: 6px;
}

.status-label {
  font-size: 0.75rem;
  color: var(--text-secondary, #999);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary, #ffffff);
}
</style>

