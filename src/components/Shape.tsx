import { FC, useState } from 'react';

const totalShapes = 16;
const totalColumns = 4;

const shapeItem = [5, 8, 9, 10, 11];

interface ShapeProps {
}

const Shape: FC<ShapeProps> = () => {
  const matrix = Array.from({ length: totalShapes / totalColumns }, (_, i) => {
    return Array.from({ length: totalColumns }, (_, j) => shapeItem.includes(i * totalColumns + j));
  });

  const [startIndex, setStartIndex] = useState<Position>();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (!startIndex) return;

    const data: ShapeItem = {
      matrix,
      start: startIndex,
    };

    e.dataTransfer.setData('text/plain', JSON.stringify(data));
  };


  return (
    <div
      draggable
      onDragStart={handleDragStart}
    >
      {matrix.map((rows, rowIndex) => (
        <div key={rowIndex} className='row'>
          {rows.map((item, rowColumn) => (
            <div
              key={rowColumn}
              onMouseDown={() => setStartIndex({ row: rowIndex, column: rowColumn })}
              style={{ backgroundColor: item ? 'pink' : '' }}
              className='box'
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Shape;
