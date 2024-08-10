enum ShapeAreaEnum {
  TOTAL = 4
}

export const makeShapeMatrix = (id: number, shapeValues: number[]) : BlockShapeValue[][] => {
  return Array.from({ length: ShapeAreaEnum.TOTAL }, (_, i) => {
    return Array.from({ length: ShapeAreaEnum.TOTAL }, (_, j) => {
      return {
        id: `shapeId-${id}-${i}-${j}`,
        value: shapeValues.includes(i * ShapeAreaEnum.TOTAL + j),
        position: {
          row: i,
          column: j
      }
    }})
  });
};

export const makeShapeValues = (matrix: BlockShapeValue[][]): number[] => {
  return matrix.flat().reduce((array, item, index) => {
    if(item.value) array.push(index);
    return array;
  }, [] as number[]);
};
