import Money from './Money';
import {
  allocate,
  allocateBy,
  AllocatorInterface,
} from './Allocator';
import {
  add,
  subtract,
  multiply,
  divide,
  absolute,
  ceil,
  floor,
  CalculatorInterface,
} from './Calculator';
import {
  equals,
  lessThan,
  lessThanOrEqualTo,
  greaterThan,
  greaterThanOrEqualTo,
  EqualityCheckerInterface,
} from './EqualityChecker';
import {
  format,
  FormatterInterface,
} from './Formatter';
import applyMethods from './utils/applyMethods';
import addParser from './Parser';

const MoneyConstructor: FullMoney = applyMethods(Money, {
  add,
  subtract,
  multiply,
  divide,
  absolute,
  ceil,
  floor,
  equals,
  lessThan,
  lessThanOrEqualTo,
  greaterThan,
  greaterThanOrEqualTo,
  allocate,
  allocateBy,
  format,
}) as unknown as FullMoney;

addParser(MoneyConstructor);

export type FullMoney = CalculatorInterface &
EqualityCheckerInterface &
AllocatorInterface &
FormatterInterface;

export default MoneyConstructor;
