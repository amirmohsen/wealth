import equals from './equals';
import lessThan from './lessThan';
import lessThanOrEqualTo from './lessThanOrEqualTo';
import greaterThan from './greaterThan';
import greaterThanOrEqualTo from './greaterThanOrEqualTo';

export interface EqualityCheckerInterface {
  equals: typeof equals;
  lessThan: typeof lessThan;
  lessThanOrEqualTo: typeof lessThanOrEqualTo;
  greaterThan: typeof greaterThan;
  greaterThanOrEqualTo: typeof greaterThanOrEqualTo;
}

export {
  equals,
  lessThan,
  lessThanOrEqualTo,
  greaterThan,
  greaterThanOrEqualTo,
};
