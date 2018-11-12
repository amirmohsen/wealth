import getDefaultSettings from '.';

test('getDefaultSettings() should match the snapshot', () => {
  expect(getDefaultSettings('USD')).toMatchInlineSnapshot(`
Object {
  "code": "USD",
  "decimalDigits": 2,
  "decimalSeparator": ".",
  "pattern": "%ns%s%v",
  "symbol": "USD",
  "thousandsSeparator": ",",
}
`);
  expect(getDefaultSettings('GBP')).toMatchInlineSnapshot(`
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
