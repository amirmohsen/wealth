import { intRegex, decimalRegex } from 'src/fp/money/createMoney/assertMoneyInput/regex';
import { FrozenBaseCurrency } from 'src/fp/types';
import { InvalidInputError } from 'src/errors';

const processDecimalInput = (baseNumber: string, decimalDigits: number): string => {
  if (intRegex.exec(baseNumber)) {
    return `${baseNumber}.${'0'.repeat(decimalDigits)}`;
  }

  const regexResult = decimalRegex({ decimalDigits, range: true }).exec(baseNumber);

  if (!regexResult) {
    throw new InvalidInputError(
      baseNumber,
      `The input value is not a string decimal with the min 1 and max ${decimalDigits} decimal digits.`,
      {
        decimalDigits,
      },
    );
  }

  const [, match] = regexResult;
  const extraZerosCount = decimalDigits - match.length;

  return `${baseNumber}${'0'.repeat(extraZerosCount)}`;
};

const processIntInput = (baseNumber: string, decimalDigits: number): string => {
  if (!intRegex.exec(baseNumber)) {
    throw new InvalidInputError(baseNumber, 'The input value is not a string integer.', {
      decimalDigits,
    });
  }
  return baseNumber;
};

const addRequiredDecimalDigits = (baseNumber: string, currency: FrozenBaseCurrency): string => {
  const { decimalDigits } = currency;
  return decimalDigits === 0
    ? processIntInput(baseNumber, decimalDigits)
    : processDecimalInput(baseNumber, decimalDigits);
};

export default addRequiredDecimalDigits;
