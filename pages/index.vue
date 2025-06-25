<template>
  <v-container>
    <v-row class="d-flex justify-center ga-1">
      <!-- bagian komponen tombol -->
       <v-btn size="large" color="success" density="default">today</v-btn>
       <v-btn size="large" density="default">pending</v-btn>
       <v-btn size="large" density="default">overdue</v-btn>
    </v-row>
  </v-container>
  <v-container>
    <!-- header komponen -->
    <v-row size="medium" class="d-flex justify-space-between mb-2">
      <h1>Task</h1>
      <v-btn title="add task" variant="tonal" prepend-icon="mdi:mdi-note-plus-outline" @click="dialog_state=!dialog_state">add task</v-btn>
    </v-row>
    <div v-for="item in items" :key="item.id">
      <CustomCard :titled="item.title" :date="item.date" :checkbox="item.checkbox" :priority="item.priority"  />
    </div>

  </v-container>

  <!-- dialog/modal show up -->
  <v-dialog
      v-model="dialog_state"
      width="auto"
    >
      <v-card
        max-width="500"
        max-height="500"
        class="pa-4"
        title="Form data"
      >
        <CustomForm />
      </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const drawer = ref(true);

  const dialog_state = ref(false);

  const items = ref([
    { id:1,
      title: 'Dashboard',
      date: 'Senin 5 Oktober 2025',
      checkbox: true,
      priority:"low"
    },
    {
      id:2,
      title: 'Team',
      date: 'Selasa 6 Oktober 2025',
      checkbox: false,
      priority:"medium"
    },
    {
      id:3,
      title: 'Projects',
      date: 'Selasa 7 Oktober 2025',
      checkbox: true,
      priority:"low"
    },
    {
      id:4,
      title: 'Calendar',
      date: 'Selasa 8 Oktober 2025',
      checkbox: false,
      priority:"medium"
    },
    {
      id:5,
      title: 'Reports',
      date: 'Selasa 9 Oktober 2025',
      checkbox: true,
      priority:"low"
    },
  ])

</script>
