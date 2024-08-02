import { TotalArea } from "../Enums/TotalArea";

interface HandleDropProps {
  matrix: Block[][];
  shapeItem: ShapeItem;
  dropAreaIndex: DropArea;
}

export const useDrop = () => {

  const getNewMove = ({ matrix, dropAreaIndex, shapeItem }: HandleDropProps): Move | void => {
    const startIndex = shapeItem.start;
    const shapeMatrix = shapeItem.matrix;

    const shapeTotalPoints = shapeMatrix.reduce((acc, row) => acc + row.filter(Boolean).length, 0);

    const move: number[] = [];

    matrix.forEach((rows, rowIndex) => {
      if (rowIndex === dropAreaIndex.row) {
        rows.forEach((_, columnIndex) => {
          if (columnIndex === dropAreaIndex.column) {
            shapeMatrix.forEach((shapeRow, shapeRowIndex) => {
              shapeRow.forEach((shapeItem, shapeColumnIndex) => {
                if (shapeItem) {
                  const matrixRowIndex = dropAreaIndex.row + shapeRowIndex - startIndex.row;
                  const matrixColumnIndex = dropAreaIndex.column + shapeColumnIndex - startIndex.column;

                  if (
                    matrixRowIndex >= 0 &&
                    matrixColumnIndex >= 0 &&
                    matrixRowIndex < TotalArea.ROW &&
                    matrixColumnIndex < TotalArea.COLUMN &&
                    (matrix[matrixRowIndex] && !matrix[matrixRowIndex][matrixColumnIndex].filled)
                  ) {
                    move.push(matrix[matrixRowIndex][matrixColumnIndex].value);
                  }
                }
              });
            });
          }
        });
      }
    });

    if (move.length !== shapeTotalPoints) return;

    return {
      numbers: move,
      color: shapeItem.color,
    }
  };

  return { getNewMove };
};
