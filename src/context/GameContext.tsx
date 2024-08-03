import React, { createContext, useContext, useEffect, useState } from 'react';
import { TotalArea } from '../Enums/TotalArea';
import shapesJson from '../shapes.json';

const GameContext = createContext<GameContextProps>({} as GameContextProps);

interface GameProviderProps {
  children: React.ReactNode;
}

interface GameContextProps {
  matrix: Block[][];
  addMove: (move: Move) => void;
  reverteMove: () => void;
  hasMoves: boolean;
  restartGame: () => void;
  shapes: ShapesUsed[];
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
      color: 'transparent'
    }));
  });
};

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [matrix, setMatrix] = useState<Block[][]>(makeMatrix());
  const [moves, setMoves] = useState<Move[]>([]);
  const [shapes, setShapes] = useState<ShapesUsed[]>(shapesJson);

  const addMove = (move: Move) => {
    const newMatrix = [...matrix];

    newMatrix.forEach((rows, rowIndex) => {
      rows.forEach((item, columnIndex) => {
        if (move.numbers.includes(item.value)) {
          newMatrix[rowIndex][columnIndex].filled = true;
          newMatrix[rowIndex][columnIndex].color = move.color;
        }
      });
    });

    setMoves((prev) => [...prev, move]);
    setMatrix(newMatrix);
  };

  const reverteMove = () => {
    const lastMove = moves[moves.length - 1];

    if (!lastMove) return matrix;

    const newMatrix = [...matrix];

    newMatrix.forEach((rows, rowIndex) => {
      rows.forEach((item, columnIndex) => {
        if (lastMove.numbers.includes(item.value)) {
          newMatrix[rowIndex][columnIndex].filled = false;
          newMatrix[rowIndex][columnIndex].color = '';
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
    <GameContext.Provider value={{ matrix, restartGame, addMove, reverteMove, shapes, hasMoves }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);

  return context;
};
