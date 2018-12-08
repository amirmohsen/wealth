import { Money } from '../../src';
import { USD } from '../../src/iso';
import { registerMultipleCurrencies } from '../../src/store';
import '../../src/methods/add';
import '../../src/methods/divide';
import '../../src/methods/equals';

describe('Wealth (oo)', () => {
  test('should work correctly', () => {
    registerMultipleCurrencies([USD]);

    const moneyA = new Money('489.23', 'USD');
    const moneyB = new Money('98.72', 'USD');

    expect(moneyA).toMatchInlineSnapshot(`
Object {
  "amount": "489.23",
  "currency": "USD",
}
`);
    expect(moneyB).toMatchInlineSnapshot(`
Object {
  "amount": "98.72",
  "currency": "USD",
}
`);

    const moneyC = moneyA.add(moneyB);

    expect(moneyC).toMatchInlineSnapshot(`
Object {
  "amount": "587.95",
  "currency": "USD",
}
`);

    const moneyD = moneyA.divide(5);

    expect(moneyD).toMatchInlineSnapshot(`
Object {
  "amount": "97.85",
  "currency": "USD",
}
`);

    expect(moneyA.equals(moneyB)).toBe(false);
  });
});
