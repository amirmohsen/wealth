import getDefaultCurrencySettings from '.';

test('getDefaultCurrencySettings() should match the snapshot', () => {
  expect(getDefaultCurrencySettings('USD')).toMatchInlineSnapshot(`
    Object {
      "decimalDigits": 2,
      "decimalSeparator": ".",
      "pattern": "%ns%s%v",
      "symbol": "USD",
      "thousandsSeparator": ",",
    }
  `);
  expect(getDefaultCurrencySettings('GBP')).toMatchInlineSnapshot(`
    Object {
      "decimalDigits": 2,
      "decimalSeparator": ".",
      "pattern": "%ns%s%v",
      "symbol": "GBP",
      "thousandsSeparator": ",",
    }
  `);
});
