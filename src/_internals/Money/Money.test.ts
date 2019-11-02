import { oneLine } from 'common-tags';
import { USD, GBP } from '../constants/ISO_CURRENCIES';
import Currency from '../Currency';
import WrongInputError from '../errors/WrongInputError';
import CurrencyMismatchError from '../errors/CurrencyMismatchError';
import getData, { CurrencySettingsInternalStore } from '../CurrencyStore/internals/getData';
import Money from '.';

jest.mock('../CurrencyStore/internals/getData');

describe('Money', () => {
  const invalidMonetaryValues: any[] = [
    undefined,
    null,
    false,
    true,
    { value: '15.75', currency: 'USD' },
    123.5,
    '$123.60',
    '$1,345,223.60',
  ];

  beforeAll(() => {
    (getData as jest.MockedFunction<() => CurrencySettingsInternalStore>).mockReturnValue({
      USD,
      GBP,
    });
  });

  test('can be initialized with float string values', () => {
    const money = new Money('15.75', 'USD');
    expect(money.currency.code).toBe('USD');
    expect(money.toString()).toBe('15.75');
  });

  test('can be initialized with integer string values', () => {
    const money = new Money('1575', 'USD');
    expect(money.currency.code).toBe('USD');
    expect(money.toString()).toBe('15.75');
  });

  test('can be initialized with integer values', () => {
    const money = new Money(1575, 'USD');
    expect(money.currency.code).toBe('USD');
    expect(money.toString()).toBe('15.75');
  });

  test('can be initialized with a Currency instance', () => {
    const money = new Money(new Money('15.75', 'USD'), 'USD');
    expect(money.currency.code).toBe('USD');
    expect(money.toString()).toBe('15.75');
  });

  test('can be initialized with a Money instance', () => {
    const money = new Money('15.75', new Currency('USD'));
    expect(money.currency.code).toBe('USD');
    expect(money.toString()).toBe('15.75');
  });

  test('can be initialized with the static "init" factory function', () => {
    const money = Money.init('15.75', 'USD');
    expect(money).toBeInstanceOf(Money);
    expect(money.currency.code).toBe('USD');
    expect(money.toString()).toBe('15.75');
  });

  describe('with valid values', () => {
    let money: Money;

    beforeAll(() => {
      money = new Money('15.75', 'USD');
    });

    test('should return a frozen object', () => {
      expect(Object.isFrozen(money)).toBe(true);
    });

    test('"amountAsBigNumber" getter should return the amount as a BigNumber instance', () => {
      const bigNumberInstance = money.amountAsBigNumber;
      expect(bigNumberInstance).toBeInstanceOf(money.bigNumberConstructor);
      expect(bigNumberInstance.toString()).toBe('15.75');
    });

    test('"amountAsStringInteger" getter should return the amount as a string integer value', () => {
      expect(money.amountAsStringInteger).toBe('1575');
    });

    test('"amountAsStringFloat" getter should return the amount as a string float value', () => {
      expect(money.amountAsStringFloat).toBe('15.75');
    });

    test('"amount" getter is an alias of the "amountAsStringFloat"', () => {
      const floatStringValue = money.amount;
      expect(floatStringValue).toBe('15.75');
      expect(floatStringValue).toBe(money.amountAsStringFloat);
    });

    test('"toString()" is an alias of the "amount"', () => {
      const floatStringValue = money.toString();
      expect(floatStringValue).toBe('15.75');
      expect(floatStringValue).toBe(money.amount);
    });

    test('"toJSON()" should return an object with the amount and currency', () => {
      const serialized = money.toJSON();
      expect(serialized).toEqual({
        amount: '15.75',
        currency: 'USD',
      });
    });

    test(
      oneLine`
      "smallestUnit" getter should return a Money instance
      worth the smallest unit of the given currency
      `,
      () => {
        const { smallestUnit } = money;
        expect(smallestUnit).toBeInstanceOf(Money);
        expect(smallestUnit.toString()).toBe('0.01');
      },
    );

    describe('when given a money instance of the same currency', () => {
      test('"hasSameCurrency" should return true', () => {
        const money2 = new Money('190.90', 'USD');
        expect(money.hasSameCurrency(money2)).toBe(true);
      });
    });

    describe('when given a Money instance of a different currency', () => {
      test('"hasSameCurrency" should return false', () => {
        const money2 = new Money('190.90', 'GBP');
        expect(money.hasSameCurrency(money2)).toBe(false);
      });
    });

    test('"clone()" should return a new Money instance with the same amount and currency', () => {
      const cloned = money.clone();
      expect(cloned.toString()).toBe('15.75');
      expect(cloned.currency.code).toBe('USD');
    });
  });

  describe('when given anything other than a Money instance', () => {
    test('"hasSameCurrency" should throw an error', () => {
      const money = new Money('15.75', 'USD');
      for (const invalidMonetaryValue of invalidMonetaryValues) {
        expect(() => money.hasSameCurrency((invalidMonetaryValue as unknown) as Money)).toThrow(
          new WrongInputError('The input value must be a "Money" instance.'),
        );
      }
    });
  });

  describe('when given a Money instance with a different currency', () => {
    test('"constructor" should throw an error', () => {
      const money = new Money('15.75', 'USD');
      expect(() => new Money(money, 'GBP')).toThrow(new CurrencyMismatchError());
    });
  });

  describe('when given any invalid input value', () => {
    test('"constructor" should throw an error', () => {
      for (const invalidMonetaryValue of invalidMonetaryValues) {
        expect(() => new Money((invalidMonetaryValue as unknown) as Money, 'USD')).toThrow(
          new WrongInputError(
            oneLine`
            The input value must be either an integer,
            an integer-like string, a float-like string or a "Money" instance.
            `,
          ),
        );
      }
    });
  });
});
