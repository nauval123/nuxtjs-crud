<template>
  <v-card title="Form Data">
    <v-form ref="formComponent" fast-fail @submit.prevent="handleSubmit">
      <v-card-text>
        <v-text-field
          v-model="formData.title"
          :rules="titleRules"
          label="Title"
        ></v-text-field>
      </v-card-text>

      <!-- v-model untuk data binding dua arah -->
      <v-card-text>
        <v-text-field
          v-model="formData.detail"
          :rules="detailRules"
          label="Detail"
        ></v-text-field>
      </v-card-text>

      <v-card-text>
        <v-number-input
          v-model="formData.amount"
          :reverse="false"
          controlVariant="stacked"
          label="Amount"
          :hideInput="false"
          :min="1"
          :inset="false"
        ></v-number-input>
      </v-card-text>

      <v-date-picker
        v-model="formData.createdAt"
        :rules="dateRules"
      ></v-date-picker>
      <v-btn class="mt-2 me-4" type="submit" block>Submit</v-btn>
      <v-btn class="mt-2 me-4" type="button" block @click="handleCancel"
        >cancel</v-btn
      >
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import type { VForm } from "vuetify/components";
import type CashInItem from "../cashModel";

const props = defineProps<{
  initialData: Partial<CashInItem>;
}>();

const formComponent = ref<InstanceType<typeof VForm> | null>(null);

const formData = ref({ ...props.initialData });

const emit = defineEmits(["cancel", "submit"]);

async function handleSubmit() {
  if (!formComponent.value) return;
  const { valid } = await formComponent.value.validate();
  console.log("valid form ubah");
  console.log(formData);
  if (valid) {
    const dateObject = new Date(formData.value.createdAt ?? "");

    const isoString = dateObject.toISOString();
    emit("submit", {
      title: formData.value.title,
      amount: Number(formData.value.amount),
      detail: formData.value.detail,
      currency: "idr",
      createdAt: isoString,
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
