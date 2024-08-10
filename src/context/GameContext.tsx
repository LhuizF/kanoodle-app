import React, { createContext, useContext, useEffect, useState } from 'react';
import { TotalArea } from '../Enums/TotalArea';
import shapesJson from '../shapes.json';

const GameContext = createContext<GameContextProps>({} as GameContextProps);

interface GameProviderProps {
  children: React.ReactNode;
}

interface GameContextProps {
  matrix: Block[][];
  addMove: (move: Move, shapeItem: ShapeItem,) => void;
  reverteMove: () => void;
  hasMoves: boolean;
  restartGame: () => void;
  shapes: ShapesUsed[];
  setCurrentShape: (shape: ShapeItem | null) => void;
  currentShape: ShapeItem | null;
  removeMoveByShapeId: (id: number) => void;
}

interface ShapesUsed extends Shape {
  used?: boolean;
}

const makeMatrix = () => {
  return Array.from({ length: TotalArea.ROW - 1 }, (_, r) => {
    return Array.from({ length: TotalArea.COLUMN }, (_, c) => ({
      position: { row: r, column: c },
      value: r * TotalArea.COLUMN + c,
      filled: false,
      color: '',
      shapeId: null,
      shapeValues: null,
      shapePosition: null,
    }));
  });
};

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [matrix, setMatrix] = useState<Block[][]>(makeMatrix());
  const [moves, setMoves] = useState<Move[]>([]);
  const [shapes, setShapes] = useState<ShapesUsed[]>(shapesJson);

  const [currentShape, setCurrentShape] = useState<ShapeItem | null>(null);

  const addMove = (move: Move, shapeItem: ShapeItem,) => {
    const newMatrix = [...matrix];

    const oldShape = shapes.find((shape) => shape.id === shapeItem.id);

    if (oldShape && oldShape.used) {
      newMatrix.forEach((rows, rowIndex) => {
        rows.forEach((item, columnIndex) => {
          if (item.shapeId === shapeItem.id) {
            newMatrix[rowIndex][columnIndex].filled = false;
            newMatrix[rowIndex][columnIndex].color = '';
            newMatrix[rowIndex][columnIndex].shapeId = null;
            newMatrix[rowIndex][columnIndex].shapeValues = null;
            newMatrix[rowIndex][columnIndex].shapePosition = null;
          }
        });
      });
    }

    const moveNumbers = move.numbers.map((item) => item.value);

    newMatrix.forEach((rows, rowIndex) => {
      rows.forEach((item, columnIndex) => {
        if (moveNumbers.includes(item.value)) {
          newMatrix[rowIndex][columnIndex].filled = true;
          newMatrix[rowIndex][columnIndex].color = move.color;
          newMatrix[rowIndex][columnIndex].shapeId = move.shapeId;
          newMatrix[rowIndex][columnIndex].shapeValues = shapeItem.values;
          newMatrix[rowIndex][columnIndex].shapePosition = move.numbers.find((number) => number.value === item.value)?.position || null;
        }
      });
    });

    setMoves((prev) => [...prev, move]);
    setMatrix(newMatrix);
  };

  //TODO: usar o metodo de remover move por id
  const reverteMove = () => {
    const lastMove = moves[moves.length - 1];

    if (!lastMove) return matrix;

    const newMatrix = [...matrix];
    const moveNumbers = lastMove.numbers.map((item) => item.value);
    newMatrix.forEach((rows, rowIndex) => {
      rows.forEach((item, columnIndex) => {
        if (moveNumbers.includes(item.value)) {
          newMatrix[rowIndex][columnIndex].filled = false;
          newMatrix[rowIndex][columnIndex].color = '';
          newMatrix[rowIndex][columnIndex].shapeId = null;
          newMatrix[rowIndex][columnIndex].shapeValues = null;
        }
      });
    });

    setMoves((prev) => {
      const newMoves = [...prev];
      newMoves.pop();
      return newMoves;
    });

    setMatrix(newMatrix);
  };

  const checkIfIsComplete = () => {
    return matrix.every((rows) => rows.every((item) => item.filled));
  };

  const hasMoves = moves.length > 0;

  const restartGame = () => {
    setMatrix(makeMatrix());
    setMoves([]);
  };

  const removeMoveByShapeId = (id: number) => {
    const newMatrix = [...matrix];

    newMatrix.forEach((rows, rowIndex) => {
      rows.forEach((item, columnIndex) => {
        if (item.shapeId === id) {
          newMatrix[rowIndex][columnIndex].filled = false;
          newMatrix[rowIndex][columnIndex].color = '';
          newMatrix[rowIndex][columnIndex].shapeId = null;
          newMatrix[rowIndex][columnIndex].shapeValues = null;
        }
      });
    });

    const newMoves = moves.filter((move) => move.shapeId !== id);
    setMoves(newMoves);

    setMatrix(newMatrix);
  };

  useEffect(() => {
    if (checkIfIsComplete()) {
      setTimeout(() => {
        alert('Parabéns');
        restartGame();
      }, 500);
    }
  }, [matrix]);

  useEffect(() => {
    const shapesIdUsed = moves.map((move) => move.shapeId);

    const newShape = shapes.map((shape) => {
      if (shapesIdUsed.includes(shape.id)) {
        return { ...shape, used: true };
      }

      return { ...shape, used: false };
    });

    setShapes(newShape);

  }, [moves]);

  return (
    <GameContext.Provider value={{
      matrix,
      restartGame,
      addMove,
      reverteMove,
      shapes,
      hasMoves,
      setCurrentShape,
      currentShape,
      removeMoveByShapeId
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);

  return context;
};
