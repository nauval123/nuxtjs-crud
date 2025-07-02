<template>
  <v-card class="mx-auto" width="400">
    <template v-slot:title>
      <span class="font-weight-black d-flex justify-center item-align-center">{{
        props.title
      }}</span>
    </template>

    <v-card-text
      class="bg-surface-light pt-4 d-flex justify-center item-align-center"
    >
      <!-- {{ props.message }} -->
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import type { CustomLoadingModel } from "./CustomLoading.model";

const props = withDefaults(defineProps<CustomLoadingModel>(), {
  title: "Loading.... Please Wait",
  message: "In Progress...",
  cloaseable: false,
});
</script>
