interface ShapeItem {
  id: number;
  matrix: boolean[][];
  start: Position;
  color: string;
}

interface Block {
  position: Position;
  value: number;
  filled: boolean;
  color: string;
}

interface DropArea {
  row: number;
  column: number;
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
