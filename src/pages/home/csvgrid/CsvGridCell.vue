<script setup lang="ts">
import { defineProps, computed, PropType } from "vue";
import { SelectedRange, isSelected } from "./selectedRange";
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
  selectedRange: {
    type: Object as PropType<SelectedRange | null>,
  },
});

const emit = defineEmits<{
  (e: "selectStart", row: number, cell: number): void;
  (e: "selectMove", row: number, cell: number): void;
  (e: "selectEnd", row: number, cell: number): void;
}>();

const selectStart = (ev: MouseEvent) => {
  emit("selectStart", props.rowIndex, props.cellIndex);
};
const selectMove = (ev: MouseEvent) => {
  emit("selectMove", props.rowIndex, props.cellIndex);
};
const selectEnd = (ev: MouseEvent) => {
  emit("selectEnd", props.rowIndex, props.cellIndex);
};

const classes = computed(() => {
  const c: string[] = [];

  c.push(`csvGridCell-cell-${props.rowIndex}-${props.cellIndex}`);
  if (
    props.selectedRange != null &&
    isSelected(props.rowIndex, props.cellIndex, props.selectedRange)
  ) {
    c.push("is-selected");
  }

  return c;
});
</script>

<template>
  <td
    class="csvGridCell"
    :class="classes"
    @mousedown="selectStart"
    @mousemove.passive="selectMove"
    @mouseup="selectEnd"
  >
    <slot>
      {{ value }}
    </slot>
  </td>
</template>
