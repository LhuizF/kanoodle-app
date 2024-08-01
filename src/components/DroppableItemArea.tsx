import { FC } from 'react';

interface DroppableAreaProps {
  handleDropItem: (x: ShapeItem, y: DropArea) => void;
  color: string;
  filled: boolean;
  position: DropArea;
}

const DroppableArea: FC<DroppableAreaProps> = ({ color, handleDropItem, filled, position }) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');

    if (!data.trim()) return;

    handleDropItem(JSON.parse(data), position);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{ backgroundColor: filled ? color : '' }}
      className='box'
    >
    </div>
  );
};

export default DroppableArea;
