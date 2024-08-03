import './App.css';
import DroppableItemArea from './components/DroppableItemArea';
import Nav from './components/Nav';
import Shape from './components/Shape';
import { useGameContext } from './context/GameContext';
import { useDrop } from './hooks/useDrop';

function App() {
  const { matrix, restartGame, addMove, reverteMove, shapes, hasMoves } = useGameContext();
  const { getNewMove } = useDrop();

  const handleDrop = (shapeItem: ShapeItem, dropAreaIndex: DropArea) => {
    const newMove = getNewMove({ matrix, shapeItem, dropAreaIndex });

    if (!newMove) return;

    addMove(newMove);
  };

  return (
    <main>
      <Nav
        restartGame={restartGame}
        handleReverteMove={reverteMove}
        hasMoves={hasMoves}
      />

      <div className='board'>
        {matrix.map((rows, rowIndex) => (
          <div key={rowIndex} className='row'>
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
          !shape.used ?
            <Shape key={shape.id} id={shape.id} position={shape.position} color={shape.color} /> :
            <div key={`fake-shape-${index}`} className='fake-shape' />
        )}
      </div>

    </main>
  );
}

export default App;
