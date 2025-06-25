<script setup lang="ts">
import AppHeader from "~/components/AppHeader.vue";
</script>

<template>
  <v-app>
    <AppHeader />
    <v-main>
      <v-container>
        <!-- <router-view /> -->
        <slot />
      </v-container>
    </v-main>
    <AppFooter>
      <span>&copy; 2023 My App</span>
    </AppFooter>
  </v-app>
</template>
