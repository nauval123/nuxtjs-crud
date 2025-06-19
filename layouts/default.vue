<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>My App</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
        <slot />
      </v-container>
    </v-main>
    <slot />
    <v-footer app color="primary" dark>
      <span>&copy; 2023 My App</span>
    </v-footer>
  </v-app>
</template>
