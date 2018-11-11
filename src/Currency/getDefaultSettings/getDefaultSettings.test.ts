import getDefaultSettings from '.';

test('getDefaultSettings() should match the snapshot', () => {
  expect(getDefaultSettings('USD')).toMatchSnapshot();
  expect(getDefaultSettings('GBP')).toMatchSnapshot();
});
