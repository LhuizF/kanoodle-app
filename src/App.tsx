import './App.css';
import { useState, useEffect } from 'react';
import DroppableItemArea from './components/DroppableItemArea';
import Shape from './components/Shape';
import { usePlay } from './hooks/usePlay';
import shapes from './shapes.json';
import { FaUndoAlt } from "react-icons/fa";
import { TotalArea } from './Enums/TotalArea';
import { useDrop } from './hooks/useDrop';


const makeMatrix = () => {
  return Array.from({ length: TotalArea.ROW - 1 }, (_, r) => {
    return Array.from({ length: TotalArea.COLUMN }, (_, c) => ({
      position: { row: r, column: c },
      value: r * TotalArea.COLUMN + c,
      filled: false,
      color: 'transparent'
    }));
  });
};

function App() {
  const [matrix, seMatrix] = useState<Block[][]>(makeMatrix());

  const { addNewMove, reverteMove, checkIfIsComplete, resetAll, hasMoves } = usePlay();

  const { getNewMove } = useDrop();

  const handleReverteMove = () => {
    const matrixWithRevertedMove = reverteMove(matrix);
    seMatrix(matrixWithRevertedMove);
  };

  const handleDrop = (shapeItem: ShapeItem, dropAreaIndex: DropArea) => {
    const newMove = getNewMove({ matrix, shapeItem, dropAreaIndex });

    if (!newMove) return;

    seMatrix([...addNewMove(newMove, matrix)]);
  };

  useEffect(() => {
    console.log('matrix');
    if (checkIfIsComplete(matrix)) {
      setTimeout(() => {
        alert('Parabéns');
        seMatrix(makeMatrix());
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

