import getDefaultCurrencySettings from '.';

test('getDefaultCurrencySettings() should match the snapshot', () => {
  expect(getDefaultCurrencySettings('USD')).toMatchInlineSnapshot(`
Object {
  "code": "USD",
  "decimalDigits": 2,
  "decimalSeparator": ".",
  "pattern": "%ns%s%v",
  "symbol": "USD",
  "thousandsSeparator": ",",
}
`);
  expect(getDefaultCurrencySettings('GBP')).toMatchInlineSnapshot(`
Object {
  "code": "GBP",
  "decimalDigits": 2,
  "decimalSeparator": ".",
  "pattern": "%ns%s%v",
  "symbol": "GBP",
  "thousandsSeparator": ",",
}
`);
});
