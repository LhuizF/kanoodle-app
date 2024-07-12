import { FC, useState } from 'react';

const totalShapes = 16;

const shapeItem = [5, 8, 9, 10, 11];

interface ShapeProps {
  handleShapeDrop: (x: any) => void;
}

const Shape: FC<ShapeProps> = ({ handleShapeDrop }) => {
  const list = Array.from({ length: totalShapes }, (_, i) => shapeItem.includes(i));
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (draggedIndex !== null) {
      handleShapeDrop(draggedIndex);
    }
  };

  const handleMouseDown = (index: number) => {
    setDraggedIndex(index);
  };

  return (
    <div
      className='shape'
      draggable
      onDragStart={handleDragStart}
    >
      {list.map((filled, index) => (
        <div
          key={index}
          style={{ backgroundColor: filled ? 'lightgreen' : '', }}
          onMouseDown={() => handleMouseDown(index)}
        />
      ))}
    </div>
  );
};

export default Shape;
