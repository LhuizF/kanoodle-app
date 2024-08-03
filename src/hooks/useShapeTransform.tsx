export const useShapeTransform = () => {

  const rotationNinetyDeg = (shapeMatrix: boolean[][]) => {
    const rotatedMatrix: boolean[][] = [];

    shapeMatrix.forEach((row, indexRow) => {
      row.forEach((c, index) => {
        if (!rotatedMatrix[index]) {
          rotatedMatrix[index] = [];
        }
        rotatedMatrix[index][row.length - 1 - indexRow] = c;

      });
    });

    return rotatedMatrix;
  };

  const flipHorizontally = (shapeMatrix: boolean[][]) =>  {
    const newShapeMatrix = shapeMatrix.map(row => [...row.reverse()]);
    return newShapeMatrix
  }

  const flipVertically = (shapeMatrix: boolean[][]) => {
    const newShapeMatrix = shapeMatrix.map(row => [...row]);
    return newShapeMatrix.reverse();
  }

  return { rotationNinetyDeg, flipHorizontally, flipVertically };
}
