<template>
  <v-sheet class="mx-auto" width="300">
    <v-form fast-fail @submit.prevent>
      <v-text-field
        v-model="firstName"
        :rules="firstNameRules"
        label="First name"
      ></v-text-field>

      <!-- v-model untuk data binding dua arah -->
      <v-text-field
        v-model="lastName" 
        :rules="lastNameRules"
        label="Last name"
      ></v-text-field>

      <v-btn class="mt-2" type="submit" block>Submit</v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup>
  import { ref } from 'vue'

  const firstName = ref('')
  const lastName = ref('123')


  const firstNameRules = [
    value => {
      if (value?.length >= 3) return true
      return 'First name must be at least 3 characters.'
    },
  ]

  const lastNameRules = [
    value => {
      if (/[^0-9]/.test(value)) return true
      return 'Last name can not contain digits.'
    },
  ]
</script>