import CompleteGraphs from './complete'
import CyclicGraphs from './cyclic'
import StarGraphs from './star'
import LadderGraphs from './ladder'
import PrismGraphs from './prism'

export default {
  ...CyclicGraphs,
  ...CompleteGraphs,
  ...StarGraphs,
  ...LadderGraphs,
  ...PrismGraphs,
}
