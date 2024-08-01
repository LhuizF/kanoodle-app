import { FC, useState } from 'react';
import { ImSpinner11 } from "react-icons/im";

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

  const [shapeMatrix, setShape] = useState<boolean[][]>(matrix);

  const [startIndex, setStartIndex] = useState<Position>();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (!startIndex) return;

    const data: ShapeItem = {
      matrix: shapeMatrix,
      start: startIndex,
      color,
    };

    e.dataTransfer.setData('text/plain', JSON.stringify(data));
  };

  const rotationShape = () => {
    const rotatedMatrix: boolean[][] = [];

    shapeMatrix.forEach((row, indexRow) => {
      row.forEach((c, index) => {
        if (!rotatedMatrix[index]) {
          rotatedMatrix[index] = [];
        }
        rotatedMatrix[index][row.length - 1 - indexRow] = c;

      });
    });

    setShape(rotatedMatrix);
  };

  return (
    <div
      key={id}
      draggable
      onDragStart={handleDragStart}
      className='shape'
    >
      {shapeMatrix.map((rows, rowIndex) => (
        <div key={rowIndex} className='row'>
          {rows.map((item, rowColumn) => (
            <div
              key={rowColumn}
              onMouseDown={() => setStartIndex({ row: rowIndex, column: rowColumn })}
              className={item ? 'box' : 'box-empty'}
              style={{ backgroundColor: item ? color : '' }}
            />
          ))}
        </div>
      ))}

      <div className='shape-controls'>
        <button className='btn-shape' onClick={rotationShape}>
          <ImSpinner11 />
        </button>
      </div>
    </div>
  );
};

export default Shape;
