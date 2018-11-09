import Money, { ROUNDING } from '../Money/Money';
import BigNumber from 'bignumber.js';
import { Calculator } from '../Calculator';

export default (baseClass: typeof Calculator) => (
  class Allocator extends baseClass {

    /**
     * Split the current value by an array of ratios
     * @param ratios - an array of numbers by which to divide up the current value
     * @returns - an array of new Money instances, resulting from splitting the current value
     */
    allocate(ratios: (string|number)[]): Money[] {
      const
        allocations: Money[] = [],
        totalValue = this.clone(),
        total: BigNumber = ratios.reduce(
          (total, ratio) => total.plus(ratio),
          new BigNumber('0'),
        );

      let remainder = this.clone();

      for (const ratio of ratios) {
        const share = totalValue
          .multiply(ratio, ROUNDING.FLOOR)
          .divide(total.toString(), ROUNDING.FLOOR);

        allocations.push(share);
        remainder = remainder.subtract(share);
      }

      return this.addRemainderToAllocations(allocations, remainder);
    }

    /**
     * Split the current value by the count
     * @param count - count by which to allocate the current value (must be a 1+ integer)
     * @returns - an array of new Money instances, resulting from splitting the current value
     */
    allocateTo(count: number|string): Money[] {
      const
        allocations: Money[] = [],
        totalValue = this.clone(),
        baseShare = totalValue.divide(count, ROUNDING.FLOOR),
        remainder = totalValue.subtract(baseShare.multiply(count, ROUNDING.FLOOR));

      for (let i = 0; i < count; i++) {
        allocations.push(baseShare.clone());
      }

      return this.addRemainderToAllocations(allocations, remainder);
    }

    /**
     * Used by allocation methods to add the remainder to the array of allocations
     * @param allocations - an array of Money instances already allocated
     * @param remainder - a Money instance with the remainder yet to be added
     * to the array of allocations
     * @returns - the final allocations array of Money instances
     */
    protected addRemainderToAllocations(allocations: Money[], remainder: Money) {
      const noMoney = new Money('0', this.currency);

      let i = 0;

      while (!remainder.equals(noMoney)) {
        allocations[i] = allocations[i].add(this.smallestUnit);
        remainder = remainder.subtract(this.smallestUnit);
        i++;
      }

      return allocations;
    }
  }
);
