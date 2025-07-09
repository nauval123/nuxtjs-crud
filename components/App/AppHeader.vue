<!-- <template>
  <v-app-bar :elevation="2">
    <template #image>
      <v-img
        src="/images/forest.jpeg"
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
        cover
      ></v-img>
    </template>
    <v-app-bar-title class="text-center text-white text-h4"
      >Catatan Keuangan</v-app-bar-title
    >
  </v-app-bar>
</template> -->
<template>
  <ClientOnly>
    <v-navigation-drawer expand-on-hover rail>
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
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-cash-plus"
          title="Data Uang Masuk"
          value="cash-in"
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
const { signOut } = useAuth();
</script>
