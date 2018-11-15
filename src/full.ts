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

export type FullMoney = typeof Money & CalculatorInterface;
// CalculatorInterface &
// EqualityCheckerInterface &
// AllocatorInterface &
// FormatterInterface;

const MoneyConstructor = applyMethods(Money, {
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

const value = new MoneyConstructor('15.00', 'USD');



export default MoneyConstructor;
