import { TotalArea } from "../Enums/TotalArea";

interface HandleDropProps {
  matrix: Block[][];
  shapeItem: ShapeItem;
  positionDropped: Position;
}

export const useDrop = () => {

  const getNewMove = ({ matrix, positionDropped, shapeItem }: HandleDropProps): Move | void => {
    const startIndex = shapeItem.start;
    const shapeMatrix = shapeItem.matrix;

    const shapeTotalPoints = shapeMatrix.reduce((acc, row) => acc + row.filter(Boolean).length, 0);

    const move: number[] = [];

    matrix.forEach((rows, rowIndex) => {
      if (rowIndex === positionDropped.row) {
        rows.forEach((_, columnIndex) => {
          if (columnIndex === positionDropped.column) {
            shapeMatrix.forEach((shapeRow, shapeRowIndex) => {
              shapeRow.forEach((shapeItem, shapeColumnIndex) => {
                if (shapeItem) {
                  const matrixRowIndex = positionDropped.row + shapeRowIndex - startIndex.row;
                  const matrixColumnIndex = positionDropped.column + shapeColumnIndex - startIndex.column;

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
      shapeId: shapeItem.id,
      numbers: move,
      color: shapeItem.color,
    }
  };

  return { getNewMove };
};
