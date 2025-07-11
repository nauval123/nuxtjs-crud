<template>
  <div class="text-center pa-4">
    <v-card
      prepend-icon="mdi-alert-circle-outline"
      :text="props.detail"
      :title="props.title"
    >
      <template v-slot:actions>
        <v-spacer></v-spacer>

        <v-btn @click="props.cancelFunc"> cancel </v-btn>

        <v-btn class="bg-warning" @click="props.acceptFunc"> continue </v-btn>
      </template>
    </v-card>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  idItem: {
    type: String,
    required: false,
  },
  acceptFunc: {
    type: Function,
    required: false,
  },
  cancelFunc: {
    type: Function,
    required: false,
  },
});

const emit = defineEmits(["cancel", "submit"]);

// function CancelonClick() {
//   emit("cancel");
// }

// function AcceptonClick() {
//   emit("submit", { idData: props.idItem });
// }
</script>
