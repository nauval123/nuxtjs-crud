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
              @click="deleteOnClick(item.id)"
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

  <v-dialog v-model="confimartion_state" width="auto" persistent>
    <ConfirmationDialog
      title="Konfirmasi Penghapusan"
      detail="apakah kamu yakin ingin menghapus data ini?"
      :idItem="idToBeDeleted"
      @submit="deleteData"
      @cancel="changeConfirmationDialogStatus()"
    />
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { VDataTableServer } from "vuetify/components";
import CustomLoading from "../components/CustomLoading/CustomLoading.vue";
import type CashInItem from "~/components/cashModel";

const headers: VDataTableServer["$props"]["headers"] = [
  { title: "Title", key: "title", align: "start" },
  { title: "Date", key: "createdAt" },
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
} = useCrud<CashInItem>("cash");

const dialog_state = ref(false);
const loading_state = ref(false);
const confimartion_state = ref(false);
const error_state = ref(false);
const idToBeDeleted = ref("");

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

// async function deleteData(itemnya: CashInItem) {
//   console.log("item yang akan didelete:" + JSON.stringify(itemnya));
//   await deleteItem(itemnya.id);
//   confimartion_state.value = false;
// }

async function deleteData(idItem: { idData: string }) {
  console.log("item yang akan deleteData:" + idItem.idData);
  await deleteItem(idItem.idData);
  confimartion_state.value = false;
}

function deleteOnClick(idItem: string) {
  console.log("item yang akan dideleteOnclick:" + idItem);
  idToBeDeleted.value = idItem;
  confimartion_state.value = true;
}

const handleFormSubmit = async (payload: CashInItem) => {
  loading_state.value = true;

  if (itemmData.value && itemmData.value.id) {
    await updateItem(itemmData.value.id, payload);
    console.log("ini edit data:");
    console.log(payload);
  } else {
    console.log("ini create data:");
    console.log(payload);
    await addItem(payload);
  }
  loading_state.value = false;
  changeDialogStatus();
};

function changeDialogStatus() {
  dialog_state.value = !dialog_state;
}

function changeConfirmationDialogStatus() {
  console.log("hapus dong");
  confimartion_state.value = !confimartion_state;
  idToBeDeleted.value = "";
}
</script>
