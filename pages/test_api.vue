<script setup lang="ts">
import { useCrud } from "~/composables/useCrud";

interface CashInItem {
  id: string;
  createdAt: string;
  title: string;
  amount: number;
  detail: string;
}

const { list: cashInList, pending: cashInPending } =
  useCrud<CashInItem>("cash-in");
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card title="Data Uang Masuk">
          <v-card-text>
            <div v-if="cashInPending">Memuat...</div>
            <v-list v-else>
              <v-list-item
                v-for="item in cashInList"
                :key="item.id"
                :title="item.title"
                :subtitle="`Jumlah: ${item.amount}`"
              ></v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
