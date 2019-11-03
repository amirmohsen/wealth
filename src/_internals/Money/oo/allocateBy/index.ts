import { Money } from '../..';
import _allocateBy from '../../fn/allocateBy';

declare module '../../../Money' {
  interface Money {
    allocateBy: (count: number | string) => Money[];
  }
}

Money.prototype.allocateBy = function allocateBy(count): Money[] {
  return _allocateBy(this, count);
};
