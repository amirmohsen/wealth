import add from './add';
import subtract from './subtract';
import multiply from './multiply';
import divide from './divide';
import absolute from './absolute';
import ceil from './ceil';
import floor from './floor';

export interface CalculatorInterface {
  add: typeof add;
  subtract: typeof subtract;
  multiply: typeof multiply;
  divide: typeof divide;
  absolute: typeof absolute;
  ceil: typeof ceil;
  floor: typeof floor;
}

export {
  add,
  subtract,
  multiply,
  divide,
  absolute,
  ceil,
  floor,
};
