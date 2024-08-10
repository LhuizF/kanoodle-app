export const useShapeTransform = () => {

  const rotationNinetyDeg = (blockShape: BlockShapeValue[][]): BlockShapeValue[][] => {
    const rotatedMatrix: BlockShapeValue[][] = [...blockShape];

    const shapeMatrix = blockShape.map(row => row.map(item => item.value));

    shapeMatrix.forEach((row, indexRow) => {
      row.forEach((c, index) => {
        if (!rotatedMatrix[index]) {
          rotatedMatrix[index] = [];
        }
        rotatedMatrix[index][row.length - 1 - indexRow].value = c;
      });
    });

    return rotatedMatrix
  };

  const flipHorizontally = (shapeMatrix: BlockShapeValue[][]) =>  {
    const newShapeMatrix = shapeMatrix.map(row => [...row.reverse()]);
    return newShapeMatrix
  }

  const flipVertically = (shapeMatrix: BlockShapeValue[][]) => {
    const newShapeMatrix = shapeMatrix.map(row => [...row]);
    return newShapeMatrix.reverse();
  }

  return { rotationNinetyDeg, flipHorizontally, flipVertically };
}
