enum ShapeAreaEnum {
  TOTAL = 4
}

export const makeShapeMatrix = (shapeValues: number[]) => {
  return Array.from({ length: ShapeAreaEnum.TOTAL }, (_, i) => {
    return Array.from({ length: ShapeAreaEnum.TOTAL }, (_, j) => shapeValues.includes(i * ShapeAreaEnum.TOTAL + j));
  });
};

export const makeShapeValues = (matrix: boolean[][]): number[] => {
  return matrix.flat().reduce((array, value, index) => {
    if(value) array.push(index);
    return array;
  }, [] as number[]);
};
