import { Money } from '../../lib/node';
import { USD } from '../../lib/node/iso';
import { registerMultipleCurrencies } from '../../lib/node/store';
import '../../lib/node/methods/add';
import '../../lib/node/methods/divide';
import '../../lib/node/methods/equals';

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
