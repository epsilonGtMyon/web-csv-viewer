<script setup lang="ts">
import { defineProps, PropType, computed } from "vue";
const props = defineProps({
  rowIndex: {
    type: Number,
    required: true,
  },
  cellIndex: {
    type: Number,
    required: true,
  },
  value: {
    type: String,
  },
});

const classes = computed(() => {
  const c: string[] = [];

  c.push(`csvGridCell-cell-${props.rowIndex}-${props.cellIndex}`);

  return c;
});
</script>

<template>
  <td class="csvGridCell" :class="classes">
    <slot>
      {{ value }}
    </slot>
  </td>
</template>
