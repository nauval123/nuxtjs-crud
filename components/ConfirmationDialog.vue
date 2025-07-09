<template>
  <div class="text-center pa-4">
    <v-card
      prepend-icon="mdi-alert-circle-outline"
      :text="props.detail"
      :title="props.title"
    >
      <template v-slot:actions>
        <v-spacer></v-spacer>

        <v-btn @click="CancelonClick()"> cancel </v-btn>

        <v-btn class="bg-warning" @click="AcceptonClick()"> Delete </v-btn>
      </template>
    </v-card>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["cancel", "submit"]);

function CancelonClick() {
  emit("cancel");
}

function AcceptonClick() {
  emit("submit", { idData: props.idItem });
}

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
    required: true,
  },
});
</script>
