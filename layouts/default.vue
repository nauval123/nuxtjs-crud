<template>
  <AppHeader />
  <v-main>
    <v-container>
      <slot />
    </v-container>
  </v-main>
  <AppFooter>
    <span>&copy; 2023 My App</span>
  </AppFooter>
</template>
