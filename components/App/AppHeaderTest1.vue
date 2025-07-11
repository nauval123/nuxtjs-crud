<template>
  <v-app-bar>
    <v-app-bar-nav-icon v-if="!mdAndUp" @click="drawer = !drawer">
    </v-app-bar-nav-icon>
    <v-toolbar-title>Aplikasi Saya</v-toolbar-title>
  </v-app-bar>

  <ClientOnly>
    <v-navigation-drawer v-model="drawer" :rail="mdAndUp" expand-on-hover>
      <v-list>
        <v-list-item
          prepend-avatar="https://i.imgflip.com/3c6ff9.png"
          subtitle="admin"
          title="profil"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-chart-bar"
          title="Dashboard"
          value="dashboard"
          to="/dashboard"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-cash-plus"
          title="Data Uang Masuk"
          value="cash-in"
          to="/"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-cash-refund"
          title="Data Uang Keluar"
          value="cash-out"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-logout"
          title="Logout"
          value="logout"
          @click="signOut({ callbackUrl: '/login' })"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDisplay } from "vuetify"; // <-- Import useDisplay

const { signOut } = useAuth();

// 3. Gunakan useDisplay untuk mendeteksi layar
const { mdAndUp } = useDisplay();

// Drawer akan terbuka di layar besar dan tertutup di layar kecil secara default
const drawer = ref(mdAndUp.value);
</script>
