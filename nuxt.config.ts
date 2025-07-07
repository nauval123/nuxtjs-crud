import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: [
    // "vuetify/lib/styles/main.sass",
    // "@mdi/font/css/materialdesignicons.min.css",
  ],
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    "@prisma/nuxt",
    "@sidebase/nuxt-auth",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    //...
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  auth: {
    baseURL: process.env.AUTH_ORIGIN, // URL aplikasi Anda
    provider: {
      type: "authjs",
    },
    globalAppMiddleware: {
      isEnabled: true,
    },
  },
  runtimeConfig: {
    // Ini sama dengan JWT_SECRET
    authJs: {
      secret: process.env.NUXT_AUTH_SECRET,
    },
    public: {
      authJs: {
        baseUrl: process.env.NUXT_PUBLIC_AUTH_JS_BASE_URL,
      },
    },
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
});
