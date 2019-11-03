import { Money } from '../..';
import _allocate from '../../fn/allocate';

declare module '../../../Money' {
  interface Money {
    allocate: (ratios: (string | number)[]) => Money[];
  }
}

Money.prototype.allocate = function allocate(ratios): Money[] {
  return _allocate(this, ratios);
};
