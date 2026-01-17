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
  border-radius: 6px;
  padding: 0.75rem;
  transition: all 0.2s ease;
  cursor: default;
}

.kpi-card:hover {
  background-color: var(--card-hover-bg, #353535);
  border-color: var(--accent-color, #646cff);
}

.kpi-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.kpi-title {
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary, #999);
  margin: 0;
}

.kpi-icon {
  width: 20px;
  height: 20px;
  background-color: var(--input-bg, #3d3d3d);
  border-radius: 4px;
}

.kpi-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary, #ffffff);
  margin-bottom: 0.25rem;
  line-height: 1;
}

.kpi-subtitle {
  font-size: 0.625rem;
  color: var(--text-secondary, #999);
  margin-top: 0.25rem;
}
</style>

