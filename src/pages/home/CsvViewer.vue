<script setup lang="ts">
import { ref } from "vue";
import { CsvReader } from "../../common/csv/CsvReader";
import CsvGrid from "./csvgrid/CsvGrid.vue";
import { decodeTextFile } from "./decodeTextFile";

const csvRecords = ref<string[][]>([]);

const csvReader = new CsvReader();

async function loadCsvFile(file: File) {
  try {
    return await decodeTextFile(file);
  } catch (e) {
    // TODO エラー
    console.error(e);
    throw e;
  }
}

const handleFile = async (ev: Event) => {
  const target = ev.target as HTMLInputElement;
  const file = (target.files as FileList)[0];
  if (file == null) {
    return;
  }

  try {
    const csvText = await loadCsvFile(file);
    csvRecords.value = csvReader.readAll([...csvText]);
  } catch (e) {
    return;
  }
};

const handleDroppedFile = async (ev: DragEvent) => {
  const file = ev.dataTransfer?.files[0];
  if (file == null) {
    return;
  }

  try {
    const csvText = await loadCsvFile(file);
    csvRecords.value = csvReader.readAll([...csvText]);
  } catch (e) {
    return;
  }
};

const dragover = () => {
  // これしておかないと ダウンロードしてしまう。
};
</script>

<template>
  <div class="csvViewer">
    <div class="csvViewer-operationArea">
      <input type="file" @change="handleFile" accept=".csv" />
    </div>
    <div
      class="csvViewer-csvGrid"
      @drop.prevent="handleDroppedFile"
      @dragover.prevent="dragover"
    >
      <CsvGrid :records="csvRecords" >
        <template #empty>
          <pre>CSVファイルを選択もしくはここにドロップしてください。
(SJIS, UTF-8が使用可能です。)
        </pre>
        </template>
      </CsvGrid>
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
