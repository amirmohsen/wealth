import Money from '../Money';
import { USD } from '../constants/ISO_CURRENCIES';
import {
  equals,
  lessThan,
  lessThanOrEqualTo,
  greaterThan,
  greaterThanOrEqualTo,
} from '.';

jest.mock('../CurrencyStore/internals/getData', () => () => ({
  USD,
}));

describe('EqualityChecker', () => {

  describe('equals', () => {

    test('should return false when the first Money value is less than the second one', () => {
      const moneyA = new Money('100.00', 'USD');
      const moneyB = new Money('500.00', 'USD');

      expect(equals(moneyA, moneyB)).toBe(false);
    });

    test('should return true when the first Money value is equal to the second one', () => {
      const moneyA = new Money('100.00', 'USD');
      const moneyB = new Money('100.00', 'USD');

      expect(equals(moneyA, moneyB)).toBe(true);
    });

    test('should return false when the first Money value is greater than the second one', () => {
      const moneyA = new Money('500.00', 'USD');
      const moneyB = new Money('100.00', 'USD');

      expect(equals(moneyA, moneyB)).toBe(false);
    });
  });

  describe('lessThan', () => {

    test('should return true when the first Money value is less than the second one', () => {
      const moneyA = new Money('100.00', 'USD');
      const moneyB = new Money('500.00', 'USD');

      expect(lessThan(moneyA, moneyB)).toBe(true);
    });

    test('should return false when the first Money value is equal to the second one', () => {
      const moneyA = new Money('100.00', 'USD');
      const moneyB = new Money('100.00', 'USD');

      expect(lessThan(moneyA, moneyB)).toBe(false);
    });

    test('should return false when the first Money value is greater than the second one', () => {
      const moneyA = new Money('500.00', 'USD');
      const moneyB = new Money('100.00', 'USD');

      expect(lessThan(moneyA, moneyB)).toBe(false);
    });
  });

  describe('lessThanOrEqualTo', () => {

    test(
      'should return true when the first Money value is less than the second one',
      () => {
        const moneyA = new Money('100.00', 'USD');
        const moneyB = new Money('500.00', 'USD');

        expect(lessThanOrEqualTo(moneyA, moneyB)).toBe(true);
      },
    );

    test(
      'should return true when the first Money value is equal to the second one',
      () => {
        const moneyA = new Money('100.00', 'USD');
        const moneyB = new Money('100.00', 'USD');

        expect(lessThanOrEqualTo(moneyA, moneyB)).toBe(true);
      },
    );

    test(
      'should return false when the first Money value is greater than the second one',
      () => {
        const moneyA = new Money('500.00', 'USD');
        const moneyB = new Money('100.00', 'USD');

        expect(lessThanOrEqualTo(moneyA, moneyB)).toBe(false);
      },
    );
  });

  describe('greaterThan', () => {

    test(
      'should return false when the first Money value is less than the second one',
      () => {
        const moneyA = new Money('100.00', 'USD');
        const moneyB = new Money('500.00', 'USD');

        expect(greaterThan(moneyA, moneyB)).toBe(false);
      },
    );

    test(
      'should return false when the first Money value is equal to the second one',
      () => {
        const moneyA = new Money('100.00', 'USD');
        const moneyB = new Money('100.00', 'USD');

        expect(greaterThan(moneyA, moneyB)).toBe(false);
      },
    );

    test(
      'should return true when the first Money value is greater than the second one',
      () => {
        const moneyA = new Money('500.00', 'USD');
        const moneyB = new Money('100.00', 'USD');

        expect(greaterThan(moneyA, moneyB)).toBe(true);
      },
    );
  });

  describe('greaterThanOrEqualTo', () => {

    test(
      'should return false when the first Money value is less than the second one',
      () => {
        const moneyA = new Money('100.00', 'USD');
        const moneyB = new Money('500.00', 'USD');

        expect(greaterThanOrEqualTo(moneyA, moneyB)).toBe(false);
      },
    );

    test(
      'should return true when the first Money value is equal to the second one',
      () => {
        const moneyA = new Money('100.00', 'USD');
        const moneyB = new Money('100.00', 'USD');

        expect(greaterThanOrEqualTo(moneyA, moneyB)).toBe(true);
      },
    );

    test(
      'should return true when the first Money value is greater than the second one',
      () => {
        const moneyA = new Money('500.00', 'USD');
        const moneyB = new Money('100.00', 'USD');

        expect(greaterThanOrEqualTo(moneyA, moneyB)).toBe(true);
      },
    );
  });
});
