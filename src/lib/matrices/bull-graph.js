import { Matrix } from 'ml-matrix'

export const BullGraph = new Matrix([
  [0, 1, 1, 0, 0],
  [1, 0, 1, 1, 0],
  [1, 1, 0, 0, 1],
  [0, 1, 0, 0, 0],
  [0, 0, 1, 0, 0],
])
