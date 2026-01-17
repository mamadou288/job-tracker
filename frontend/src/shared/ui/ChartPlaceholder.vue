<script setup>
defineProps({
  type: {
    type: String,
    default: 'bar',
    validator: (value) => ['bar', 'pie', 'line'].includes(value),
  },
  data: {
    type: Object,
    required: true,
  },
})

function getMaxValue(data) {
  if (Array.isArray(data)) {
    return Math.max(...data.map(item => typeof item === 'object' ? item.value : item), 0)
  }
  return Math.max(...Object.values(data), 0)
}

function getBarHeight(value, maxValue) {
  if (maxValue === 0) return 0
  return Math.round((value / maxValue) * 100)
}
</script>

<template>
  <div class="chart-placeholder">
    <div v-if="type === 'bar'" class="bar-chart">
      <div
        v-for="(value, key) in data"
        :key="key"
        class="bar-item"
      >
        <div class="bar-label">{{ key }}</div>
        <div class="bar-wrapper">
          <div
            class="bar"
            :style="{ height: `${getBarHeight(value, getMaxValue(data))}%` }"
          >
            <span class="bar-value">{{ value }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="type === 'pie'" class="pie-chart">
      <div class="pie-placeholder">
        <div class="pie-text">Graphique circulaire</div>
        <div class="pie-subtext">Données disponibles</div>
      </div>
    </div>

    <div v-else-if="type === 'line'" class="line-chart">
      <div class="line-placeholder">
        <div class="line-text">Graphique linéaire</div>
        <div class="line-subtext">Données disponibles</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bar-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  gap: 1rem;
  width: 100%;
  height: 250px;
  padding: 1rem;
}

.bar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.bar-label {
  font-size: 0.75rem;
  color: var(--text-secondary, #999);
  margin-bottom: 0.5rem;
  text-align: center;
  text-transform: capitalize;
}

.bar-wrapper {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
}

.bar {
  width: 80%;
  background: linear-gradient(to top, var(--accent-color, #646cff), var(--accent-hover, #535bf2));
  border-radius: 4px 4px 0 0;
  min-height: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 0.5rem;
  transition: all 0.3s ease;
  position: relative;
}

.bar:hover {
  opacity: 0.8;
  transform: scaleY(1.05);
}

.bar-value {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-primary, #ffffff);
}

.pie-chart,
.line-chart {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pie-placeholder,
.line-placeholder {
  text-align: center;
  color: var(--text-secondary, #999);
}

.pie-text,
.line-text {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.pie-subtext,
.line-subtext {
  font-size: 0.875rem;
  opacity: 0.7;
}
</style>

