<template>
  <v-sheet border rounded>
    <v-container>
      <v-row class="d-flex justify-center ga-1 my-2">
        <!-- bagian komponen tombol -->
        <v-btn size="large" color="success" density="default">today</v-btn>
        <v-btn size="large" density="default">pending</v-btn>
        <v-btn size="large" density="default">overdue</v-btn>
      </v-row>
    </v-container>
    <v-container>
      <v-data-table
        :headers="headers"
        :hide-default-footer="data.length < 11"
        :items="data"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>
              <v-icon
                color="medium-emphasis"
                icon="mdi-format-list-checks"
                size="x-small"
                start
              ></v-icon>

              To Do List
            </v-toolbar-title>

            <v-btn
              class="me-2"
              prepend-icon="mdi-plus"
              rounded="lg"
              text="Add new task"
              border
              @click="dialog_state = !dialog_state"
            ></v-btn>
          </v-toolbar>
        </template>

        <template v-slot:item.actions="{ item }">
          <div class="d-flex ga-2 justify-end">
            <v-icon
              color="medium-emphasis"
              icon="mdi-pencil"
              size="small"
              @click="edit(item.id)"
            ></v-icon>

            <v-icon
              color="medium-emphasis"
              icon="mdi-delete"
              size="small"
              @click="remove(item.id)"
            ></v-icon>
          </div>
        </template>
      </v-data-table>
    </v-container>
  </v-sheet>

  <!-- <v-container class="mt-2"> -->
  <!-- header komponen -->
  <!-- <v-row size="medium">
      <v-row class="d-flex justify-space-between mb-2">
        <h1>Task</h1>
        <v-btn
          title="add task"
          variant="tonal"
          prepend-icon="mdi:mdi-note-plus-outline"
          @click="dialog_state = !dialog_state"
          >add task</v-btn
        ></v-row
      > -->

  <!-- <v-row>
        <div class="d-flex flex-wrap" v-for="item in items" :key="item.id">
          <CustomCard
            :titled="item.title"
            :date="item.date"
            :checkbox="item.checkbox"
            :priority="item.priority"
            :customFunc="modalFunc"
          /></div
      ></v-row>
    </v-row>
  </v-container> -->

  <!-- dialog/modal show up -->
  <v-dialog v-model="dialog_state" width="auto">
    <v-card class="pa-5" width="80vw" title="Task">
      <template v-slot:title class="text-center d-flex justify-space-between">
      </template>
      <CustomForm />
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const drawer = ref(true);
const dialog_state = ref(false);
const headers = [
  { title: "Title", key: "title", align: "start" },
  { title: "Date", key: "date" },
  { title: "Priority", key: "priority", align: "end" },
  { title: "Actions", key: "actions", align: "end", sortable: false },
];
const data = ref([
  {
    id: 1,
    title: "Dashboard",
    date: "Senin 5 Oktober 2025",
    checkbox: true,
    priority: "low",
  },
  {
    id: 2,
    title: "Team",
    date: "Selasa 6 Oktober 2025",
    checkbox: false,
    priority: "medium",
  },
  {
    id: 3,
    title: "Projects",
    date: "Selasa 7 Oktober 2025",
    checkbox: true,
    priority: "low",
  },
  {
    id: 4,
    title: "Calendar",
    date: "Selasa 8 Oktober 2025",
    checkbox: false,
    priority: "medium",
  },
  {
    id: 5,
    title: "Reports",
    date: "Selasa 9 Oktober 2025",
    checkbox: true,
    priority: "low",
  },
  {
    id: 6,
    title: "Reports",
    date: "Selasa 9 Oktober 2025",
    checkbox: true,
    priority: "low",
  },
  {
    id: 7,
    title: "Reports",
    date: "Selasa 9 Oktober 2025",
    checkbox: true,
    priority: "low",
  },
  {
    id: 8,
    title: "Reports",
    date: "Selasa 9 Oktober 2025",
    checkbox: true,
    priority: "low",
  },
  {
    id: 9,
    title: "Reports",
    date: "Selasa 9 Oktober 2025",
    checkbox: true,
    priority: "low",
  },
]);
</script>
