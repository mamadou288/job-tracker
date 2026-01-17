<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="kpi-card">
    <div class="kpi-header">
      <h3 class="kpi-title">{{ title }}</h3>
      <div v-if="icon" class="kpi-icon">
        <!-- Icon placeholder - can be replaced with SVG icons later -->
      </div>
    </div>
    <div class="kpi-value">{{ value }}</div>
    <div v-if="subtitle" class="kpi-subtitle">{{ subtitle }}</div>
  </div>
</template>

<style scoped>
.kpi-card {
  background-color: var(--card-bg, #2d2d2d);
  border: 1px solid var(--border-color, #3d3d3d);
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.2s ease;
  cursor: default;
}

.kpi-card:hover {
  background-color: var(--card-hover-bg, #353535);
  border-color: var(--accent-color, #646cff);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.kpi-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.kpi-title {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary, #999);
  margin: 0;
}

.kpi-icon {
  width: 24px;
  height: 24px;
  background-color: var(--input-bg, #3d3d3d);
  border-radius: 4px;
}

.kpi-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary, #ffffff);
  margin-bottom: 0.5rem;
  line-height: 1;
}

.kpi-subtitle {
  font-size: 0.75rem;
  color: var(--text-secondary, #999);
  margin-top: 0.5rem;
}
</style>

