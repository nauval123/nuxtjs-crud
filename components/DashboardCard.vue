<template>
  <v-card class="mx-auto" max-width="500" min-width="200">
    <v-card-title class="text-subtitle-2 font-weight-thin">{{
      title
    }}</v-card-title>
    <v-card-text class="text-h5 text-decoration-underline font-weight-bold"
      >25 M</v-card-text
    >
    <v-card-actions>
      <v-row>
        <v-col cols="5">
          <div class="d-flex flex-column justify-center align-center">
            <span>{{ content }}%</span>
            <span>venue</span>
          </div>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols="7">
          <div class="d-flex flex-column justify-center align-center">
            <span>{{ previous }}</span>
            <span>Previous Period</span>
          </div>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
  previous: {
    type: String,
    default: "",
  },
});
</script>
