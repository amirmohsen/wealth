import Money from './Money';
import * as Allocator from './Allocator';
import * as Calculator from './Calculator';
import * as EqualityChecker from './EqualityChecker';
import * as Formatter from './Formatter';
import applyMethods from './utils/applyMethods';
import addParser from './Parser';

const MoneyConstructor = applyMethods(Money, {
  ...Allocator,
  ...Calculator,
  ...EqualityChecker,
  ...Formatter,
});

addParser(MoneyConstructor);

export default MoneyConstructor;
