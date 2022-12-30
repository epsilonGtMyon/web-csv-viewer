<script setup lang="ts">
import { ref } from "vue";
import { CsvReader } from "../../common/csv/CsvReader";
import CsvGrid from "./csvgrid/CsvGrid.vue";
import { decodeTextFile } from "./decodeTextFile";

const csvRecords = ref<string[][]>([]);

const csvReader = new CsvReader();

const handleFile = async (ev: Event) => {
  const target = ev.target as HTMLInputElement;
  const file = (target.files as FileList)[0];

  let csvText: string;
  try {
    csvText = await decodeTextFile(file);
  } catch (e) {
    // TODO エラー
    console.error(e);
    return;
  }

  csvRecords.value = csvReader.readAll([...csvText]);
};
</script>

<template>
  <div class="csvViewer">
    <div class="csvViewer-operationArea">
      <input type="file" @change="handleFile" />
    </div>
    <div class="csvViewer-csvGrid">
      <CsvGrid :records="csvRecords" />
    </div>
  </div>
</template>

<style>
.csvViewer {
  height: 100%;

  display: flex;
  flex-direction: column;
}
.csvViewer-csvGrid {
  flex-grow: 1;
  overflow-x: auto;
}
</style>
