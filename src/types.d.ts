interface ShapeItem {
  id: number;
  matrix: boolean[][];
  start: Position;
  color: string;

  values: number[];
}

interface Block {
  position: Position;
  value: number;
  filled: boolean;
  color: string;
  shapeId: number | null;
  shapeValues: number[] | null;
}

interface Position {
  row: number;
  column: number;
}

interface Shape {
  id: number;
  position: number[];
  color: string;
}

interface Move {
  shapeId: number;
  numbers: number[];
  color: string;
}
