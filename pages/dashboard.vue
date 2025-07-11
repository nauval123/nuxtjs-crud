<template>
  <v-container class="fill-height">
    <v-sheet class="d-flex flex-column ga-2" width="100%">
      <v-sheet class="text-center">
        <v-row>
          <v-col cols="4">
            <DashboardCard
              title="Total Pemasukan Sekarang"
              content="$26M"
              previous="$25M"
            />
          </v-col>
          <v-col cols="4">
            <DashboardCard
              title="Total Pegeluaran Sekarang"
              content="$22M"
              previous="$25M"
            />
          </v-col>
          <v-col cols="4">
            <DashboardCard
              title="Total Uang Sekarang"
              content="$1M"
              previous="$0.5M"
            />
          </v-col>
        </v-row>
      </v-sheet>
      <v-spacer></v-spacer>
      <v-sheet>
        <v-row>
          <v-col cols="6">
            <v-card class="mx-auto text-center" color="green" dark>
              <v-card-text>
                <v-sheet color="rgba(0, 0, 0, .12)">
                  <v-sparkline
                    :model-value="value"
                    color="rgba(255, 255, 255, .7)"
                    height="150"
                    padding="24"
                    stroke-linecap="round"
                    smooth
                  >
                    <template v-slot:label="item"> ${{ item.value }} </template>
                  </v-sparkline>
                </v-sheet>
              </v-card-text>

              <v-card-text>
                <div class="font-weight-thin">Sales Last 24h</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card class="mx-auto text-center" color="green" dark>
              <v-card-text>
                <v-sheet color="rgba(0, 0, 0, .12)">
                  <v-sparkline
                    :model-value="value"
                    color="rgba(255, 255, 255, .7)"
                    height="150"
                    padding="24"
                    stroke-linecap="round"
                    smooth
                  >
                    <template v-slot:label="item"> ${{ item.value }} </template>
                  </v-sparkline>
                </v-sheet>
              </v-card-text>

              <v-card-text>
                <div class="font-weight-thin">Sales Last 24h</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-sheet>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DashboardCard from "~/components/DashboardCard.vue";

const value = ref([423, 446, 675, 510, 590, 610, 760]);
</script>

<style>
/* Opsional: memastikan root elemen mengambil tinggi penuh */
html,
body,
#app {
  height: 100%;
  margin: 0;
}
</style>
