<template>
  <v-form
    ref="formComponent"
    fast-fail
    @submit.prevent="handleSubmit"
    class="bg-primary"
  >
    <v-text-field
      v-model="formData.title"
      :rules="titleRules"
      label="Title"
    ></v-text-field>

    <!-- v-model untuk data binding dua arah -->
    <v-text-field
      v-model="formData.detail"
      :rules="detailRules"
      label="Detail"
    ></v-text-field>

    <v-number-input
      v-model="formData.amount"
      :reverse="false"
      controlVariant="stacked"
      label="Amount"
      :hideInput="false"
      :min="1"
      :inset="false"
    ></v-number-input>

    <v-date-picker
      v-model="formData.createdAt"
      :rules="dateRules"
    ></v-date-picker>
    <v-btn class="mt-2 me-4" type="submit" block>Submit</v-btn>
    <v-btn class="mt-2 me-4" type="button" block @click="handleCancel"
      >cancel</v-btn
    >
  </v-form>
</template>

<script setup lang="ts">
import type { VForm } from "vuetify/components";
import type CashInItem from "./cashModel";

const props = defineProps<{
  initialData: Partial<CashInItem>;
}>();

const formComponent = ref<InstanceType<typeof VForm> | null>(null);

const formData = ref<Partial<CashInItem>>({});

watch(
  () => props.initialData,
  (newData) => {
    formData.value = newData ? { ...newData } : {};
  },
  { immediate: true }
);

const emit = defineEmits(["cancel", "submit"]);

async function handleSubmit() {
  if (!formComponent.value) return;
  const { valid } = await formComponent.value.validate();

  if (valid) {
    emit("submit", {
      title: formData.value.title,
      amount: Number(formData.value.amount),
      detail: formData.value.detail,
      createdAt: formData.value.createdAt,
    });
  }
}

function handleCancel() {
  emit("cancel");
}

const titleRules = [
  (value: string) => {
    if (value?.length >= 3) return true;
    return "title must be at least 3 characters.";
  },
];

const dateRules = [
  (value: string) => {
    if (value) return true;
    return "Choose a date.";
  },
];

const detailRules = [
  (value: string) => {
    if (value?.length >= 1) return true;
    return "Detail must be at least 1 character.";
  },
];
</script>
