import { useState, FC } from 'react';

interface DroppableAreaProps {
  handleDropItem: (x: ShapeItem, y: DropArea) => void;
  number: number;
  filled: boolean;
  position: DropArea;
}

const DroppableArea: FC<DroppableAreaProps> = ({ number, handleDropItem, filled, position }) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    if (!data) return;
    handleDropItem(JSON.parse(data), position);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{ backgroundColor: filled ? 'pink' : '' }}
      className='box'
    >
    </div>
  );
};

export default DroppableArea;
