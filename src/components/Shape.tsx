import { FC, useState } from 'react';

const totalShapes = 16;
const totalColumns = 4;

interface ShapeProps {
  id: number;
  position: number[];
  color: string;
}

const Shape: FC<ShapeProps> = ({ id, position, color }) => {
  const matrix = Array.from({ length: totalShapes / totalColumns }, (_, i) => {
    return Array.from({ length: totalColumns }, (_, j) => position.includes(i * totalColumns + j));
  });

  const [startIndex, setStartIndex] = useState<Position>();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (!startIndex) return;

    const data: ShapeItem = {
      matrix,
      start: startIndex,
      color,
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
              style={{ backgroundColor: item ? color : '' }}
              className='box'
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Shape;
