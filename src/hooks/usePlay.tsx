import { useState } from "react";

export const usePlay = () => {
  const [moves, setMoves] = useState<Move[]>([]);

  const addNewMove = (move: Move, matrix: Block[][]) => {
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

    return matrix;
  };

  const reverteMove = (matrix: Block[][]) => {
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

    return newMatrix;
  };

  const checkIfIsComplete = (matrix: Block[][]) => {
    return matrix.every((rows) => rows.every((item) => item.filled));
  };

  const resetAll = () => {
    setMoves([]);
  }

  const hasMoves = moves.length > 0;

  return { addNewMove, reverteMove, checkIfIsComplete, resetAll, hasMoves };
};
