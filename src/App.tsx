import './App.css';
import { useState, useEffect } from 'react';
import DroppableItemArea from './components/DroppableItemArea';
import Shape from './components/Shape';
import { usePlay } from './hooks/usePlay';
import shapes from './shapes.json';
import { FaUndoAlt } from "react-icons/fa";

const totalRows = 6;
const totalColumns = 11;

const makeMatrix = (totalRows: number, totalColumns: number) => {
  return Array.from({ length: totalRows - 1 }, (_, r) => {
    return Array.from({ length: totalColumns }, (_, c) => ({
      position: { row: r, column: c },
      value: r * totalColumns + c,
      filled: false,
      color: 'transparent'
    }));
  });
};

function App() {
  const [matrix, seMatrix] = useState<Block[][]>(makeMatrix(totalRows, totalColumns));

  const { addNewMove, reverteMove, checkIfIsComplete, resetAll, hasMoves } = usePlay();

  const handleDrop = (shapeItem: ShapeItem, dropAreaIndex: DropArea) => {
    const newMatrix = [...matrix];
    const startIndex = shapeItem.start;
    const shapeMatrix = shapeItem.matrix;

    const shapeTotalPoints = shapeMatrix.reduce((acc, row) => acc + row.filter(Boolean).length, 0);

    const move: number[] = [];

    newMatrix.forEach((rows, rowIndex) => {
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
    console.log('move ::', shapeItem.color);
    const matrixWithNewMove = addNewMove({ numbers: move, color: shapeItem.color }, newMatrix);

    seMatrix(matrixWithNewMove);
  };

  const handleReverteMove = () => {
    const matrixWithRevertedMove = reverteMove(matrix);
    seMatrix(matrixWithRevertedMove);
  };

  useEffect(() => {
    if (checkIfIsComplete(matrix)) {
      setTimeout(() => {
        alert('Parabéns');
        seMatrix(makeMatrix(totalRows, totalColumns));
        resetAll();
      }, 500);
    }
  }, [matrix]);

  return (
    <main>
      <nav>
        <button
          className='btn-undo'
          onClick={handleReverteMove}
          disabled={!hasMoves}
          title='Desfazer'
        >
          <FaUndoAlt />
        </button>
      </nav>
      <div className='board'>
        {matrix.map((rows, rowIndex) => (
          <div
            key={rowIndex}
            className='row'
          >
            {rows.map((item, itemIndex) => (
              <DroppableItemArea
                key={itemIndex}
                color={item.color}
                filled={item.filled}
                position={item.position}
                handleDropItem={handleDrop}
              />
            ))}
          </div>
        ))}
      </div>

      <div className='shape-container'>
        {shapes.map(shape => (
          <Shape
            key={shape.id}
            id={shape.id}
            position={shape.position}
            color={shape.color}
          />
        ))}
      </div>
    </main>
  );
}

export default App;

