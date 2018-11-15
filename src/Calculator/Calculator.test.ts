import { Money } from '../Money';
import { USD, JPY, OMR } from '../constants/ISO_CURRENCIES';
import {
  add,
  subtract,
  multiply,
  divide,
  absolute,
  ceil,
  floor,
} from '.';

jest.mock('../CurrencyStore/internals/getData', () => () => ({
  USD,
  JPY,
  OMR,
}));

describe('Calculator', () => {

  describe('add', () => {

    describe('with "USD" that has 2 decimal digits', () => {

      test('should add two Money values', () => {
        const moneyA = new Money('10.38', 'USD');
        const moneyB = new Money('8404.97', 'USD');

        expect(add(moneyA, moneyB).toString()).toBe('8415.35');
      });
    });

    describe('with "OMR" that has 3 decimal digits', () => {

      test('should add two Money values', () => {
        const moneyA = new Money('10.381', 'OMR');
        const moneyB = new Money('8404.977', 'OMR');

        expect(add(moneyA, moneyB).toString()).toBe('8415.358');
      });
    });

    describe('with "JPY" that has no decimal digits', () => {

      test('should add two Money values', () => {
        const moneyA = new Money('10', 'JPY');
        const moneyB = new Money('8404', 'JPY');

        expect(add(moneyA, moneyB).toString()).toBe('8414');
      });
    });
  });

  describe('subtract', () => {

    describe('with "USD" that has 2 decimal digits', () => {

      test('should subtract two Money values', () => {
        const moneyA = new Money('840.00', 'USD');
        const moneyB = new Money('78.62', 'USD');

        expect(subtract(moneyA, moneyB).toString()).toBe('761.38');
      });
    });

    describe('with "OMR" that has 3 decimal digits', () => {

      test('should subtract two Money values', () => {
        const moneyA = new Money('840.001', 'OMR');
        const moneyB = new Money('78.672', 'OMR');

        expect(subtract(moneyA, moneyB).toString()).toBe('761.329');
      });
    });

    describe('with "JPY" that has no decimal digits', () => {

      test('should subtract two Money values', () => {
        const moneyA = new Money('840', 'JPY');
        const moneyB = new Money('78', 'JPY');

        expect(subtract(moneyA, moneyB).toString()).toBe('762');
      });
    });
  });

  describe('multiply', () => {

    describe('with "USD" that has 2 decimal digits', () => {

      test('should multiply a Money value by a number', () => {
        const	moneyA = new Money('5', 'USD');

        expect(multiply(moneyA, '4.05').toString()).toBe('0.20');
      });
    });

    describe('with "OMR" that has 3 decimal digits', () => {

      test('should multiply a Money value by a number', () => {
        const moneyA = new Money('1.705', 'OMR');

        expect(multiply(moneyA, '4.05').toString()).toBe('6.905');
      });
    });

    describe('with "JPY" that has no decimal digits', () => {

      test('should multiply a Money value by a number', () => {
        const moneyA = new Money('13', 'JPY');

        expect(multiply(moneyA, '4').toString()).toBe('52');
      });
    });
  });

  describe('divide', () => {

    describe('with "USD" that has 2 decimal digits', () => {

      test('should divide a Money value by a number', () => {
        const moneyA = new Money('1096.37', 'USD');

        expect(divide(moneyA, '80.47').toString()).toBe('13.62');
      });
    });

    describe('with "OMR" that has 3 decimal digits', () => {

      test('should divide a Money value by a number', () => {
        const moneyA = new Money('1096.347', 'OMR');

        expect(divide(moneyA, '80').toString()).toBe('13.704');
      });
    });

    describe('with "JPY" that has no decimal digits', () => {

      test('should divide a Money value by a number', () => {
        const moneyA = new Money('1096', 'JPY');

        expect(divide(moneyA, '80').toString()).toBe('14');
      });
    });
  });

  test('absolute should return the absolute value of a Money value', () => {
    const moneyA = new Money('-100.00', 'USD');

    expect(moneyA.toString()).toBe('-100.00');
    expect(absolute(moneyA).toString()).toBe('100.00');
  });

  test('floor should return the floor value of a Money value', () => {
    const moneyA = new Money('100.18', 'USD');

    expect(moneyA.toString()).toBe('100.18');
    expect(floor(moneyA).toString()).toBe('100.00');
  });

  test('ceil should return the ceil value of a Money value', () => {
    const moneyA = new Money('100.18', 'USD');

    expect(moneyA.toString()).toBe('100.18');
    expect(ceil(moneyA).toString()).toBe('101.00');
  });
});
