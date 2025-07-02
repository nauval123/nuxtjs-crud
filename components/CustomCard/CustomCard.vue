<template>
  <v-card class="elevation-3 pa-3 ma-2">
    <v-checkbox :model="props.checkbox"></v-checkbox>
    <template v-slot:title>
      {{ props.titled }}
      <v-btn icon="mdi:mdi-grease-pencil" color="error" variant="plain">
      </v-btn>
    </template>
    <template v-slot:subtitle>
      {{ props.date }}
    </template>
    <template v-slot:text>
      {{ props.content }}
    </template>
  </v-card>
</template>

<script setup lang="ts">
import { type CustomCardModel } from "./CustomCard.model";
const props = withDefaults(defineProps<CustomCardModel>(), {
  titled: "info",
  date: "Senin 5 Oktober 2025",
  content: "content",
  checkbox: true,
  priority: "low",
  // customFunc: () => "",
});
</script>
