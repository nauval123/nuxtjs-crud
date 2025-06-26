<template>
  <v-form fast-fail @submit.prevent>
    <v-text-field
      v-model="title"
      :rules="titleRules"
      label="title"
    ></v-text-field>

    <!-- v-model untuk data binding dua arah -->
    <v-text-field
      v-model="content"
      :rules="contentRules"
      label="Last name"
    ></v-text-field>

    <v-date-picker v-model="date" :rules="dateRules"></v-date-picker>

    <v-btn class="mt-2 me-4" type="submit" block>Submit</v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
// const props = withDefaults(defineProps<FormModel>(), {
//   titled: "judul default";
//   date: "string";
//   checkbox: true;
//   priority: "string";
//   content?: "string";
// });

const title = ref("");
const content = ref("");
const date = ref("");

const titleRules = [
  (value) => {
    if (value?.length >= 3) return true;
    return "title must be at least 3 characters.";
  },
];

const dateRules = [
  (value) => {
    if (value?.length > 0) return true;
    return "title must bea at least 1 character.";
  },
];

const contentRules = [
  (value) => {
    if (value?.length > 1) return true;
    return "content must be at least 1 character.";
  },
];
</script>
