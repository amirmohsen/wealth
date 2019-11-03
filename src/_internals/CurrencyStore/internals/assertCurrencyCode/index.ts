import { oneLine } from 'common-tags';
import WrongInputError from '../../../errors/WrongInputError';

const assertCurrencyCode = (code: string): void => {
  if (typeof code !== 'string' || !code || code !== code.trim().toUpperCase()) {
    throw new WrongInputError(
      oneLine`
        Currency code must be a non-empty,
        uppercase string with contain no leading or trailing spaces
      `,
    );
  }
};

export default assertCurrencyCode;
