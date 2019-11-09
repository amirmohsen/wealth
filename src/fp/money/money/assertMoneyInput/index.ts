import { WrongInputError } from 'src/shared/errors';
import { FrozenBaseCurrency } from 'src/fp/types';

const assertInt = (value: string): void => {
  if (!/^[-|+]?\d+$/.exec(value)) {
    throw new WrongInputError(
      `The input value, "${value}", is not an integer to match the currency's 0 decimal digits.`,
    );
  }
};

const assertFixedDigitDecimal = (value: string, decimalDigits: number): void => {
  if (!new RegExp(`^[-|+]?\\d+\\.\\d{${decimalDigits}}$`).exec(value)) {
    throw new WrongInputError(
      `The input value, "${value}", is not a fixed decimal number to match the currency's ${decimalDigits} decimal digits.`,
    );
  }
};

const assertValidNumber = (value: string, decimalDigits: number): void =>
  decimalDigits === 0 ? assertInt(value) : assertFixedDigitDecimal(value, decimalDigits);

const assertMoneyInput = (value: string, currency: FrozenBaseCurrency): string => {
  if (typeof value !== 'string') {
    throw new WrongInputError(`The input value, "${value}", is not a string.`);
  }
  assertValidNumber(value, currency.decimalDigits);
  return value;
};

export default assertMoneyInput;
