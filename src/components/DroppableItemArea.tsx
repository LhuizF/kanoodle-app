import { useState, FC } from 'react';

interface DroppableAreaProps {
  handleDropItem: (x: number, index: number) => void;
  value: number
  filled: boolean
}

const DroppableArea: FC<DroppableAreaProps> = ({ value, handleDropItem, filled }) => {
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
    setIsOver(false);
    handleDropItem(Number(data), value);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        backgroundColor: isOver ? 'lightgreen' : '',
      }}
      className='box'
    >
      {filled ? 'X' : value}
    </div>
  );
};

export default DroppableArea;
