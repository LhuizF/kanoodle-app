interface ShapeItem {
  id: number;
  matrix: BlockShapeValue[][];
  start: Position;
  color: string;

  values: number[];
}

interface BlockShapeValue {
  id: string;
  value: boolean;
  position: Position;
}

interface Block {
  position: Position;
  value: number;
  filled: boolean;
  color: string;
  shapeId: number | null;
  shapeValues: number[] | null;

  shapePosition: Position | null;
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
  numbers: { value: number, position: { row: number, column: number; }}[];
  color: string;
}
