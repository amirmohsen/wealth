import { currencySymbol } from '../../../../symbols';
import { BaseCurrencyInput, BaseCurrency } from '../../../../types';

const processCurrencyInput = (currency: BaseCurrencyInput): BaseCurrency => {
  let settings = {};

  if (currency[currencySymbol]) {
    settings = currency.settings;
  } else if (currency && typeof currency === 'string') {
    settings = getRegisteredCurrency(currency);
  } else if (currency && typeof currency === 'object' && !Array.isArray(currency)) {
    if (typeof currency.code !== 'string' || !currency.code) {
      throw new InvalidCurrencyError('Invalid currency settings; code is required.');
    }

    let defaultSettings = getDefaultSettings(currency.code);

    if (isCurrencyRegistered(currency.code)) {
      defaultSettings = {
        ...defaultSettings,
        ...(getRegisteredCurrency(currency.code) as BaseCurrency),
      };
    }

    settings = {
      ...defaultSettings,
      ...currency,
    };
  } else {
    throw new WrongInputError('Invalid currency provided.');
  }

  return settings as BaseCurrency;
};

export default processCurrencyInput;
