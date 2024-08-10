import { FC, useState } from 'react';
import { useGameContext } from '../context/GameContext';
import { useDrop } from '../hooks/useDrop';
import { makeShapeMatrix } from '../libs/utils';

interface DroppableAreaProps {
  handleDropItem: (shapeItem: ShapeItem, positionDropped: Position) => void;
}

const DroppableArea: FC<DroppableAreaProps> = ({ handleDropItem }) => {
  const [preview, setPreview] = useState<number[]>([]);
  const { matrix, currentShape, setCurrentShape } = useGameContext();
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

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, block: Block) => {
    if (!block.shapeValues || !block.shapeValues || !block.shapeId) return;

    const data: ShapeItem = {
      id: block.shapeId,
      color: block.color,
      matrix: makeShapeMatrix(block.shapeValues),
      start: { row: 0, column: 0 }, //FIXME: pegar a posição de click em relação ao shape total (4x4)
      values: block.shapeValues
    };

    setCurrentShape(data);

    e.dataTransfer.setData('text/plain', JSON.stringify(data));
  };

  return (
    <div className='board'>
      {matrix.map((rows, rowIndex) =>
        <div className='row' key={`row-${rowIndex}`} >
          {rows.map((item, itemIndex) => (
            <div
              key={`item-${rowIndex}-${itemIndex}`}
              onDragOver={(e) => handleDragOver(e, item.position)}
              onDrop={(e) => handleDrop(e, item.position)}
              onDragLeave={() => setPreview([])}
              className='box'
              style={{ backgroundColor: item.filled ? item.color : preview.includes(item.value) ? '#838383' : '' }}
              draggable={item.filled}
              onDragStart={(e) => item.filled && handleDragStart(e, item, )}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DroppableArea;
