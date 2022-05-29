import { Matrix } from 'ml-matrix'

const cyclic = i => {
  const matrix = [...Array(i).keys()].map(r => {
    return [...Array(i).keys()]
      .map(c => c === (r + 1) % i || c === (r + i - 1) % i ? 1 : 0)
  }, [])
  return new Matrix(matrix)
}

export default [...Array(10).keys()].reduce((graphs, i) => ({
  ...graphs,
  [`C_${ i + 1 }`]: cyclic(i + 1)
}), {})
