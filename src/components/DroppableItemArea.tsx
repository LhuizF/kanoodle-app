import { useState, FC } from 'react';

interface DroppableAreaProps {
  handleDropItem: (x: ShapeItem, y: DropArea) => void;
  number: number;
  filled: boolean;
  position: DropArea;
}

const DroppableArea: FC<DroppableAreaProps> = ({ number, handleDropItem, filled, position }) => {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(true);
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    if(!data) return;
    setIsOver(false);
    handleDropItem(JSON.parse(data), position);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}

      onDrop={handleDrop}
      style={{
        backgroundColor: filled ? 'pink' : (isOver ? 'lightgreen' : ''),

      }}
      className='box'
    >
      {filled ? 'X' : number}
    </div>
  );
};

export default DroppableArea;
