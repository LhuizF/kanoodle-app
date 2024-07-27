import { useState } from "react";

export const usePlay = () => {
  const [moves, setMoves] = useState<number[][]>([]);

  const addNewMove = (move: number[], matrix: Item[][]) => {
    const newMatrix = [...matrix];

    newMatrix.forEach((rows, rowIndex) => {
      rows.forEach((item, columnIndex) => {
        if (move.includes(item.value)) {
          newMatrix[rowIndex][columnIndex].filled = true;
        }
      });
    });

    setMoves((prev) => [...prev, move]);

    return matrix;
  };

  const reverteMove = (matrix: Item[][]) => {
    const lastMove = moves[moves.length - 1];

    if (!lastMove) return matrix;

    const newMatrix = [...matrix];

    newMatrix.forEach((rows, rowIndex) => {
      rows.forEach((item, columnIndex) => {
        if (lastMove.includes(item.value)) {
          newMatrix[rowIndex][columnIndex].filled = false;
        }
      });
    });

    setMoves((prev) => {
      const newMoves = [...prev];
      newMoves.pop();
      return newMoves;
    });

    return newMatrix;
  };

  const checkIfIsComplete = (matrix: Item[][]) => {
    return matrix.every((rows) => rows.every((item) => item.filled));
  };

  return { addNewMove, reverteMove, checkIfIsComplete };
};
