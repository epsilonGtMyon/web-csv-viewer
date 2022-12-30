<script setup lang="ts">
import { defineProps, PropType, computed, ref } from "vue";
import CsvGridCell from "./CsvGridCell.vue";
import { SelectedRange, normalizeSelectedRange } from "./selectedRange";

const props = defineProps({
  // ヘッダーあるか？
  hasHeader: {
    type: Boolean,
    default: true,
  },

  // レコード一覧
  records: {
    type: Array as PropType<string[][]>,
    default: () => [],
  },
});

//-----------------
// ヘッダ、データ

// ヘッダ
const header = computed(() =>
  props.hasHeader && props.records.length >= 1 ? props.records[0] : []
);
// 明細データ
const dataRows = computed(() =>
  props.hasHeader
    ? props.records.filter((_, index) => index > 0)
    : props.records
);

//-----------------
// 選択範囲

const selectedRange = ref<SelectedRange | null>(null);
const selecting = ref<boolean>(false);
const normalizedSelectedRange = computed(() =>
  selectedRange.value == null
    ? null
    : normalizeSelectedRange(selectedRange.value)
);

const handleSelectedFrom = (row: number, cell: number) => {
  selectedRange.value = {
    fromRow: row,
    fromCell: cell,
    toRow: row,
    toCell: cell,
  };
  selecting.value = true;
};
const handleSelecting = (row: number, cell: number) => {
  if (!selecting.value) {
    return;
  }
  if (selectedRange.value == null) {
    return;
  }
  selectedRange.value.toRow = row;
  selectedRange.value.toCell = cell;
};
const handleSelectedTo = (row: number, cell: number) => {
  if (selectedRange.value == null) {
    return;
  }
  selectedRange.value.toRow = row;
  selectedRange.value.toCell = cell;

  selecting.value = false;
};
</script>

<template>
  <div class="csvGrid--container">
    <table class="csvGrid">
      <template v-if="hasHeader">
        <thead>
          <tr>
            <th class="is-titleCell"></th>
            <template v-for="(h, index) in header" :key="index">
              <th>{{ h }}</th>
            </template>
          </tr>
        </thead>
      </template>

      <tbody>
        <template v-for="(dataRow, rowIndex) in dataRows" :key="rowIndex">
          <tr>
            <td class="is-titleCell">{{ rowIndex + 1 }}</td>
            <template v-for="(dataCell, cellIndex) in dataRow" :key="cellIndex">
              <CsvGridCell
                :row-index="rowIndex"
                :cell-index="cellIndex"
                :selected-range="normalizedSelectedRange"
                @select-start="handleSelectedFrom"
                @select-move="handleSelecting"
                @select-end="handleSelectedTo"
                >{{ dataCell }}</CsvGridCell
              >
            </template>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style>
.csvGrid--container {
  width: 100%;
  height: 100%;
}

.csvGrid {
  border-collapse: collapse;
}
.csvGrid .is-titleCell {
  min-width: 50px;
  text-align: center;
  
  position: sticky;
  left: 0;
  z-index:2;
}

.csvGrid th,
.csvGrid td {
  border: 1px solid #dbdbdb;
  background-color:white;

  white-space: pre-wrap;
  min-width: 80px;
  padding: 0 0.5em 0 0.5em;
}
.csvGrid th {
  position: sticky;
  top: 0;
  z-index:1;
}

.csvGridCell {
  user-select: none;
}
.csvGridCell:hover {
  background-color: rgba(50, 200, 50, 0.3);
}
.csvGridCell.is-selected {
  border: 1px solid rgba(50, 152, 200, 0.7);;
  background-color: rgba(50, 152, 200, 0.3);
}
</style>
