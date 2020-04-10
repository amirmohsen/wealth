import { InvalidInputError } from 'src/errors';
import { FrozenBaseCurrency } from 'src/fp/types';
import { decimalRegex, intRegex } from './regex';

const assertInt = (value: string): void => {
  if (!intRegex.exec(value)) {
    throw new InvalidInputError(value, `The input value is not an integer to match the currency's 0 decimal digits.`);
  }
};

const assertFixedDigitDecimal = (value: string, decimalDigits: number): void => {
  if (!decimalRegex({ decimalDigits }).exec(value)) {
    throw new InvalidInputError(
      value,
      `The input value is not a fixed decimal number to match the currency's decimal digits.`,
      {
        decimalDigits,
      },
    );
  }
};

const assertValidNumber = (value: string, decimalDigits: number): void =>
  decimalDigits === 0 ? assertInt(value) : assertFixedDigitDecimal(value, decimalDigits);

const assertMoneyInput = (value: string, currency: FrozenBaseCurrency): string => {
  if (typeof value !== 'string') {
    throw new InvalidInputError(value, 'The input value is not a string.');
  }
  assertValidNumber(value, currency.decimalDigits);
  return value;
};

export default assertMoneyInput;
