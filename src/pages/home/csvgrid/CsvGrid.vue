<script setup lang="ts">
import { defineProps, PropType, computed } from "vue";
import CsvGridCell from "./CsvGridCell.vue";

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
              <CsvGridCell :row-index="rowIndex" :cell-index="cellIndex">{{
                dataCell
              }}</CsvGridCell>
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
}

.csvGrid th,
.csvGrid td {
  border: 1px solid #dbdbdb;

  white-space: pre-wrap;
  min-width: 80px;
  padding: 0 0.5em 0 0.5em;
}
</style>
