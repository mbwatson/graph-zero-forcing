import { Matrix } from 'ml-matrix'

const complete = i => Matrix.sub(Matrix.ones(i, i), Matrix.eye(i, i))

export default [...Array(10).keys()].reduce((graphs, i) => ({
  ...graphs,
  [`K_${ i + 1 }`]: complete(i + 1)
}), {})
