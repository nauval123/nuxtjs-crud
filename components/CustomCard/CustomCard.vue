<template>
    <v-sheet class="d-flex justify-space-between align-center elevation-3 px-2" height="100">
      <v-checkbox :label="titled"  :model-value="true"></v-checkbox>
      <div>
        <v-icon icon="mdi:mdi-timer-sand"></v-icon>
        <span>{{props.date}}</span>
      </div>
      <div>
        <v-btn icon="mdi:mdi-grease-pencil" color="error" variant="plain"></v-btn>
        <v-icon icon="mdi-checkbox-blank-circle"></v-icon>
      </div>
    </v-sheet>
</template>

<script setup lang="ts">
    import { type CustomCardModel} from './CustomCard.model'
    const props = withDefaults(defineProps<CustomCardModel>(), {
        titled: 'info',
        date:"Senin 5 Oktober 2025",
        checkbox:true,
        priority:"low"
    });

    const checkbox1 = ref(true)
</script>