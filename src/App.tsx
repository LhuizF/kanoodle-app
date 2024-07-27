import './App.css';
import { useState, useEffect } from 'react';
import DroppableItemArea from './components/DroppableItemArea';
import Shape from './components/Shape';
import { usePlay } from './hooks/usePlay';

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


  const { addNewMove, reverteMove, checkIfIsComplete } = usePlay();

  const handleDrop = (shapeItem: ShapeItem, dropAreaIndex: DropArea) => {
    const newMatrix = [...matrix];
    const startIndex = shapeItem.start;
    const shapeMatrix = shapeItem.matrix;

    const totalRows = totalItems / totalColumns;

    const shapeTotalPoints = shapeMatrix.reduce((acc, row) => acc + row.filter(Boolean).length, 0);

    const move: number[] = [];

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
                    move.push(newMatrix[matrixRowIndex][matrixColumnIndex].value);
                  }
                }
              });
            });
          }
        });
      }
    });

    if (move.length !== shapeTotalPoints) return;

    const matrixWithNewMove = addNewMove(move, newMatrix);

    seMatrix(matrixWithNewMove);
  };

  const handleReverteMove = () => {
    const matrixWithRevertedMove = reverteMove(matrix);
    seMatrix(matrixWithRevertedMove);
  };

  useEffect(() => {
   // console.log('win ::', checkIfIsComplete(matrix));
  }, [matrix]);

  return (
    <main>
      <nav>
        <button onClick={handleReverteMove} >{'<'}</button>
      </nav>
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

