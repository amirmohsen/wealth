import { WrongInputError } from '../../../errors';
import { oneLine } from 'common-tags';

const assertCurrencyCode = (code: string) => {
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