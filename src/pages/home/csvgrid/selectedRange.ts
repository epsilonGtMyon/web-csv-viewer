export type SelectedRange = {
  fromRow: number;
  fromCell: number;
  toRow: number;
  toCell: number;
};

export function normalizeSelectedRange(selected: SelectedRange): SelectedRange
export function normalizeSelectedRange(selected?: SelectedRange): SelectedRange | null {
  if(selected == null) {
    return null;
  }
  // 終了位置が開始位置より上や左の場合があるので調整
  const minRow = Math.min(selected.fromRow, selected.toRow);
  const minCell = Math.min(selected.fromCell, selected.toCell);
  const maxRow = Math.max(selected.fromRow, selected.toRow);
  const maxCell = Math.max(selected.fromCell, selected.toCell);

  return {
    fromRow: minRow,
    fromCell: minCell,
    toRow: maxRow,
    toCell: maxCell,
  };
}

export function isSelected(
  row: number,
  cell: number,
  selected: SelectedRange
) {
  const range = normalizeSelectedRange(selected);
  if (range.fromRow <= row && row <= range.toRow) {
    // OK
  } else {
    return false;
  }

  if (range.fromCell <= cell && cell <= range.toCell) {
    // OK
  } else {
    return false;
  }

  return true;
}
