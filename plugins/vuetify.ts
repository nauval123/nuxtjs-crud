// import this after install `@mdi/font` package
import "@mdi/font/css/materialdesignicons.css";
import { aliases, fa } from "vuetify/iconsets/fa";
import { mdi } from "vuetify/iconsets/mdi";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { VDateInput } from "vuetify/labs/VDateInput";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components: {
      ...components,
      VDateInput, // 2. Daftarkan komponen di sini
    },
    theme: {
      defaultTheme: "light",
    },
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: {
        fa,
        mdi,
      },
    },
    directives,
  });
  app.vueApp.use(vuetify);
});
