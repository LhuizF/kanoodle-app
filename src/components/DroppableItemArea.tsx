import { FC, useState } from 'react';
import { useGameContext } from '../context/GameContext';
import { useDrop } from '../hooks/useDrop';

interface DroppableAreaProps {
  handleDropItem: (x: ShapeItem, y: Position) => void;
}

const DroppableArea: FC<DroppableAreaProps> = ({ handleDropItem }) => {
  const [preview, setPreview] = useState<number[]>([]);

  const { matrix, currentShape } = useGameContext();
  const { getNewMove } = useDrop();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, position: Position) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (!currentShape) return;

    const newMove = getNewMove({ matrix, shapeItem: currentShape, positionDropped: position });


    if (!newMove) return;
    setPreview(newMove.numbers);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, position: Position) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');

    if (!data.trim()) return;

    handleDropItem(JSON.parse(data), position);
    setPreview([]);
  };

  return (
    <div className='board'>
      {matrix.map((rows, rowIndex) =>
        <div className='row' key={`row-${rowIndex}`} >
          {rows.map((item, itemIndex) => (
            <div
              key={`item${rowIndex}-${itemIndex}`}
              onDragOver={(e) => handleDragOver(e, item.position)}
              onDrop={(e) => handleDrop(e, item.position)}
              onDragLeave={() => setPreview([])}
              className='box'
              style={{ backgroundColor: item.filled ? item.color : preview.includes(item.value) ? '#838383' : '' }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DroppableArea;
