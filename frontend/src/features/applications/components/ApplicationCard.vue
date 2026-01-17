<script setup>
defineProps({
  application: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['click'])

function handleClick() {
  emit('click')
}
</script>

<template>
  <div class="application-card" @click="handleClick">
    <div class="card-content">
      <h3 class="card-company">{{ application.company }}</h3>
      <p class="card-title">{{ application.title }}</p>
    </div>
  </div>
</template>

<style scoped>
    .application-card {
    background-color: var(--card-bg, #2d2d2d);
    border: 1px solid var(--border-color, #3d3d3d);
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 0.75rem;
    cursor: pointer;
    transition: all 0.2s ease;
    user-select: none;
    }

    .application-card:hover {
    background-color: var(--card-hover-bg, #353535);
    border-color: var(--accent-color, #646cff);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .card-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    }

    .card-company {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-primary, #ffffff);
    margin: 0;
    }

    .card-title {
    font-size: 0.75rem;
    color: var(--text-secondary, #999);
    margin: 0;
    line-height: 1.4;
    }
</style>

