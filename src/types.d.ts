interface ShapeItem {
  matrix: boolean[][]
  start: Position
}

interface Item {
  position: Position;
  value: number
  filled: boolean;
}

interface DropArea {
  row: number
  column: number
}

interface Position{
  row: number
  column: number
}
