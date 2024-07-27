import './App.css';
import { useState } from 'react';
import DroppableItemArea from './components/DroppableItemArea';
import Shape from './components/Shape';

const totalItems = 66;
const totalColumns = 11;


function App() {
  const [matrix, seMatrix] = useState<Item[][]>(Array.from({ length: totalItems / totalColumns }, (_, r) => {
    return Array.from({ length: totalColumns }, (_, c) => ({
      position: { row: r, column: c },
      value: r * totalColumns + c,
      filled: false,
    }));
  }));


  const handleDrop = (shapeItem: ShapeItem, dropAreaIndex: DropArea) => {
    const newMatrix = [...matrix];
    const startIndex = shapeItem.start;
    const shapeMatrix = shapeItem.matrix;

    const totalRows = totalItems / totalColumns;

    const shapeTotalPoints = shapeMatrix.reduce((acc, row) => acc + row.filter(Boolean).length, 0);

    const points: number[] = [];

    newMatrix.forEach((rows, rowIndex) => {
      if (rowIndex === dropAreaIndex.row) {
        rows.forEach((item, columnIndex) => {
          if (columnIndex === dropAreaIndex.column) {
            shapeMatrix.forEach((shapeRow, shapeRowIndex) => {
              shapeRow.forEach((shapeItem, shapeColumnIndex) => {
                if (shapeItem) {
                  const matrixRowIndex = dropAreaIndex.row + shapeRowIndex - startIndex.row;
                  const matrixColumnIndex = dropAreaIndex.column + shapeColumnIndex - startIndex.column;
                  
                  if (
                    matrixRowIndex >= 0 &&
                    matrixColumnIndex >= 0 &&
                    matrixRowIndex < totalRows &&
                    matrixColumnIndex < totalColumns &&
                    !newMatrix[matrixRowIndex][matrixColumnIndex].filled
                  ) {
                    points.push(newMatrix[matrixRowIndex][matrixColumnIndex].value);
                  }

                }
              });
            });
          }
        });
      }
    });

    if (points.length !== shapeTotalPoints) return;

    newMatrix.forEach((rows, rowIndex) => {
      rows.forEach((item, columnIndex) => {
        if (points.includes(item.value)) {
          newMatrix[rowIndex][columnIndex].filled = true;
        }
      });
    });

    seMatrix(newMatrix);
  };

  return (
    <main>
      <div>
        {matrix.map((rows, rowIndex) => (
          <div
            key={rowIndex}
            className='row'
          >
            {rows.map((item, itemIndex) => (
              <DroppableItemArea
                key={itemIndex}
                number={item.value}
                filled={item.filled}
                position={item.position}
                handleDropItem={handleDrop}
              />
            ))}
          </div>
        ))}
      </div>

      <div className='shape-container'>
        <Shape />
      </div>
    </main>
  );
}

export default App;

