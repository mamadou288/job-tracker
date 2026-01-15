<script setup>
import { useApplicationsStore } from '../app/store/applications.store';
import { STATUSES } from '../features/applications/model/statuses';


const store = useApplicationsStore()
</script>

<template>
  <div>
    <h1>Board</h1>

    <div class="board">
      <div v-for="s in STATUSES" :key="s.key" class="column">
        <h2>{{ s.label }}</h2>

        <ul>
          <li v-for="app in store.applicationsByStatus(s.key)" :key="app.id">
            {{ app.company }} — {{ app.title }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

