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

    const shapeTotalPoints = shapeMatrix.reduce((acc, row) => acc + row.map(r => r.value).filter(Boolean).length, 0);

    const move: { value: number, position: { row: number, column: number; }; }[] = [];

    matrix.forEach((rows, rowIndex) => {
      if (rowIndex === positionDropped.row) {
        rows.forEach((_, columnIndex) => {
          if (columnIndex === positionDropped.column) {
            shapeMatrix.forEach((shapeRow, shapeRowIndex) => {
              shapeRow.forEach((blockShapeItem, shapeColumnIndex) => {
                if (blockShapeItem.value) {

                  const matrixRowIndex = positionDropped.row + shapeRowIndex - startIndex.row;
                  const matrixColumnIndex = positionDropped.column + shapeColumnIndex - startIndex.column;

                  if (
                    matrixRowIndex >= 0 &&
                    matrixColumnIndex >= 0 &&
                    matrixRowIndex < TotalArea.ROW &&
                    matrixColumnIndex < TotalArea.COLUMN &&
                    (matrix[matrixRowIndex] && !matrix[matrixRowIndex][matrixColumnIndex].filled)
                  ) {
                    move.push({
                      value: matrix[matrixRowIndex][matrixColumnIndex].value,
                      position: blockShapeItem.position,
                    });
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
    };
  };

  return { getNewMove };
};
