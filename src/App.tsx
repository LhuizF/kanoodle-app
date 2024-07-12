import './App.css';
import { useState } from 'react';
import DroppableItemArea from './components/DroppableItemArea';
import Shape from './components/Shape';

const totalItems = 66;

interface Item {
  value: number;
  filled: boolean;
}

function App() {

  const [list, setList] = useState<Item[]>(Array.from({ length: totalItems }, (_, i) => ({ value: i, filled: false })));

  const handleDrop = (itemValue: number, index: number) => {
    const newList = [...list];
    newList[index].filled = true;
    setList(newList);
    console.log('itemValue:', itemValue);
  };

  const handleShapeDrop = (index: number) => {
    console.log('index:', index);
  };

  return (
    <main>
      <div className='grid'>
        {list.map((item, index) => (
          <DroppableItemArea
            key={index}
            handleDropItem={handleDrop}
            value={item.value}
            filled={item.filled}
          />
        ))}
      </div>

      <div className='shape-container'>
        <Shape
          handleShapeDrop={handleShapeDrop}
        />
      </div>
    </main>
  );
}

export default App;

