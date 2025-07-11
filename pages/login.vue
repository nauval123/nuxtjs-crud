<template>
  <div
    class="d-flex flex-column align-center justify-center mt-16"
    min-width="370"
  >
    <v-img
      class="d-none d-sm-block"
      :width="150"
      aspect-ratio="16/9"
      cover
      src="https://icons.veryicon.com/png/o/business/dark-blue-financial-business-icon/money-pile.png"
    ></v-img>
    <v-card
      class="pa-12 pb-8 mx-auto mt-4"
      elevation="8"
      max-width="30vw"
      min-width="350"
      width="25vw"
      rounded="lg"
    >
      <template v-slot:title>
        <span class="font-weight-black">Pencatatan Keuangan</span>
      </template>
      <v-form ref="formComponent" fast-fail @submit.prevent="handleLogin">
        <div class="text-subtitle-1 text-medium-emphasis">Account</div>
        <v-text-field
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          v-model="email"
          :rules="emailRules"
        ></v-text-field>

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Password
        </div>

        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          v-model="password"
          @click:append-inner="visible = !visible"
          :rules="passwordRules"
        ></v-text-field>

        <v-card-text
          v-if="errorMessage"
          class="text-medium-emphasis text-caption"
        >
          {{ errorMessage }}
        </v-card-text>

        <v-btn
          class="mb-8"
          color="blue"
          size="large"
          type="submit"
          variant="tonal"
          block
        >
          login
        </v-btn>
        <!-- <v-btn
          class="mb-8"
          color="blue"
          size="large"
          type="submit"
          variant="tonal"
          block
        >
          Login dengan GitHub
        </v-btn> -->
      </v-form>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import type { VForm } from "vuetify/components";

definePageMeta({
  layout: "login",
  // middleware: "authenticated",
  // auth: false,
  auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: "/" },
});

const visible = ref(false);
const { signIn } = useAuth();
const email = ref("");
const password = ref("");
const errorMessage = ref<string | null>(null);

const formComponent = ref<InstanceType<typeof VForm> | null>(null);

const emailRules = [
  (value: string) => {
    if (value?.length >= 3) return true;
    return "email tidak boleh kosong";
  },
];

const passwordRules = [
  (value: string) => {
    if (value) return true;
    return "password tidak boleh kosong";
  },
];

// const gitHubLogin = async () => {
//   const result = await signIn("github")
// };

const handleLogin = async () => {
  errorMessage.value = null;

  if (!formComponent.value) return;
  const { valid } = await formComponent.value.validate();

  if (valid) {
    try {
      const result = await signIn("credentials", {
        email: email.value,
        password: password.value,
        redirect: false,
      });

      if (result?.error) {
        errorMessage.value = result.error;
      } else {
        await navigateTo("/");
      }
    } catch (e: any) {
      console.error("Login Gagal (Unexpected Error):", e);
      errorMessage.value = "Terjadi kesalahan pada server.";
    }
  }
};
</script>
