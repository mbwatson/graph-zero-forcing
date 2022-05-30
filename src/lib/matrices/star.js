import { Matrix } from 'ml-matrix'

const star = i => {
  const matrix = [...Array(i + 1).keys()].map(r => {
    return [...Array(i + 1).keys()]
      .map(c => c !== r && (r === 1 || c === 1) ? 1 : 0)
  }, [])
  return new Matrix(matrix)
}

export default [...Array(8).keys()]
  .map(i => i + 3)
  .reduce((graphs, i) => ({
    ...graphs,
    [`S_${ i }`]: star(i)
  }), {})
