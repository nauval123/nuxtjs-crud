<template>
  <v-sheet border rounded>
    <v-container>
      <v-data-table
        :headers="headers"
        :hide-default-footer="cashInData.length < 11"
        :items="cashInData"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>
              <v-icon
                color="medium-emphasis"
                icon="mdi-cash-plus"
                size="x-small"
                start
              ></v-icon>

              Data Uang Masuk
            </v-toolbar-title>

            <v-btn
              class="me-2"
              prepend-icon="mdi-plus"
              rounded="lg"
              text="Tambahkan Data Uang Masuk"
              border
              @click="createOnClick()"
            ></v-btn>
          </v-toolbar>
        </template>

        <template v-slot:item.actions="{ item }">
          <div class="d-flex ga-2 justify-end">
            <v-icon
              color="medium-emphasis"
              icon="mdi-pencil"
              size="small"
              @click="editOnclick(item)"
            ></v-icon>

            <v-icon
              color="medium-emphasis"
              icon="mdi-delete"
              size="small"
              @click="deleteOnClick(item)"
            ></v-icon>
          </div>
        </template>
      </v-data-table>
    </v-container>
  </v-sheet>

  <!-- dialog/modal show up -->
  <v-dialog v-model="dialog_state" width="auto">
    <CustomForm
      :initial-data="itemmData"
      @submit="handleFormSubmit"
      @cancel="changeDialogStatus()"
    />
  </v-dialog>

  <v-dialog v-model="loading_state" width="auto" persistent>
    <CustomLoading />
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { VDataTableServer } from "vuetify/components";
import CustomLoading from "../components/CustomLoading/CustomLoading.vue";
import type CashInItem from "~/components/cashModel";

const headers: VDataTableServer["$props"]["headers"] = [
  { title: "Title", key: "title", align: "start" },
  { title: "Date", key: "date" },
  { title: "Detail", key: "detail", align: "end" },
  { title: "Amount", key: "amount", align: "end" },
  { title: "Currencey", key: "currency", align: "end" },
  { title: "Actions", key: "actions", align: "end", sortable: false },
];

const {
  list: cashInData,
  pending: statusPending,
  error: statusError,
  addItem,
  updateItem,
  deleteItem,
} = useCrud<CashInItem>("cash-in");

const dialog_state = ref(false);
const loading_state = ref(false);

watch(
  () => statusPending.value,
  (newstatus) => {
    loading_state.value = newstatus;
  },
  { immediate: true }
);

const itemmData = ref<CashInItem>({
  id: "",
  title: "",
  detail: "",
  amount: 0,
  currency: "idr",
  createdAt: "",
});

function createOnClick() {
  dialog_state.value = true;
  itemmData.value = {
    id: "",
    title: "",
    detail: "",
    amount: 0,
    createdAt: "",
    currency: "idr",
  };
}

function editOnclick(itemnya: any) {
  console.log("item yang akan diupdate:" + itemnya);
  dialog_state.value = true;
  itemmData.value = itemnya;
}

async function deleteOnClick(itemnya: any) {
  console.log("item yang akan didelete:" + JSON.stringify(itemnya));
  // await deleteItem(itemnya.value.id);
}

const jeda = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const handleFormSubmit = async (payload: CashInItem) => {
  loading_state.value = true;

  if (itemmData.value && itemmData.value.id) {
    await updateItem(itemmData.value.id, payload);
    // jeda(3000);
    console.log("ini edit data:");
    console.log(payload);
  } else {
    console.log("ini create data:");
    console.log(payload);
    await addItem(payload);
    // jeda(3000);
  }
  loading_state.value = false;
  changeDialogStatus();
};

function changeDialogStatus() {
  dialog_state.value = !dialog_state;
}
</script>
