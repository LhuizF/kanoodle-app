import './App.css';
import { useState, useEffect } from 'react';
import DroppableItemArea from './components/DroppableItemArea';
import Shape from './components/Shape';
import { usePlay } from './hooks/usePlay';
import shapes from './shapes.json';
import { TotalArea } from './Enums/TotalArea';
import { useDrop } from './hooks/useDrop';
import { MdUndo, MdRestartAlt } from "react-icons/md";

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
  const [shapesUsed, setShapesUsed] = useState<number[]>([]);

  const { addNewMove, reverteMove, checkIfIsComplete, resetAllMoves, hasMoves } = usePlay();
  const { getNewMove } = useDrop();

  const handleReverteMove = () => {
    const matrixWithRevertedMove = reverteMove(matrix);
    seMatrix(matrixWithRevertedMove);
    const newShapesUsed = shapesUsed.pop();

    if (newShapesUsed) {
      setShapesUsed([...shapesUsed]);
    }
  };

  const handleDrop = (shapeItem: ShapeItem, dropAreaIndex: DropArea) => {
    const newMove = getNewMove({ matrix, shapeItem, dropAreaIndex });

    if (!newMove) return;

    seMatrix(addNewMove(newMove, matrix));
    setShapesUsed((prev) => [...prev, shapeItem.id]);
  };

  useEffect(() => {
    if (checkIfIsComplete(matrix)) {
      setTimeout(() => {
        alert('Parabéns');
        restartGame();
      }, 500);
    }
  }, [shapesUsed]);

  const restartGame = () => {
    seMatrix(makeMatrix());
    setShapesUsed([]);
    resetAllMoves();
  }

  return (
    <main>
      <nav>
        <button
          className='btn btn-restart'
          onClick={restartGame}
          disabled={!hasMoves}
          title='Reiniciar'
        >
          <MdRestartAlt />
        </button>
        <button
          className='btn btn-undo'
          onClick={handleReverteMove}
          disabled={!hasMoves}
          title='Desfazer'
        >
          <MdUndo />
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
        {shapes.map((shape, index) =>
          !shapesUsed.includes(shape.id) ?
            <Shape key={shape.id} id={shape.id} position={shape.position} color={shape.color} /> :
            <div key={`fake-shape-${index}`} className='fake-shape' />
        )}
      </div>
    </main>
  );
}

export default App;
