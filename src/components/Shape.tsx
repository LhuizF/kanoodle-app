import { FC, useState } from 'react';
import { ImSpinner11 } from "react-icons/im";
import { PiFlipHorizontalFill, PiFlipVerticalFill } from "react-icons/pi";
import { useShapeTransform } from '../hooks/useShapeTransform';
import { useGameContext } from '../context/GameContext';
import { makeShapeMatrix, makeShapeValues } from '../libs/utils';

interface ShapeProps {
  id: number;
  position: number[];
  color: string;
}

const Shape: FC<ShapeProps> = ({ id, position, color }) => {
  const [shapeMatrix, setShape] = useState<boolean[][]>(makeShapeMatrix(position));
  const [startIndex, setStartIndex] = useState<Position>();

  const { setCurrentShape } = useGameContext();

  const { rotationNinetyDeg, flipHorizontally, flipVertically } = useShapeTransform();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (!startIndex) return;

    const data: ShapeItem = {
      id,
      matrix: shapeMatrix,
      start: startIndex,
      color,
      values: makeShapeValues(shapeMatrix)
    };

    setCurrentShape(data);

    e.dataTransfer.setData('text/plain', JSON.stringify(data));
  };

  const rotationShape = () => {
    setShape(rotationNinetyDeg(shapeMatrix));
  };

  const flipHorizontallyShape = () => {
    setShape(flipHorizontally(shapeMatrix));
  };

  const flipVerticallyShape = () => {
    setShape(flipVertically(shapeMatrix));
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
              key={`${rowColumn}-${rowIndex}`}
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
        <button className='btn-shape' onClick={flipHorizontallyShape}>
          <PiFlipHorizontalFill />
        </button>
        <button className='btn-shape' onClick={flipVerticallyShape}>
          <PiFlipVerticalFill />
        </button>
      </div>
    </div>
  );
};

export default Shape;
