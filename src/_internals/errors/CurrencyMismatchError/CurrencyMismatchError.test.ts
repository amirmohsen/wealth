import CurrencyMismatchError from '.';
import WealthError from '../WealthError';

describe('CurrencyMismatchError', () => {
  test('should extend "WealthError"', () => {
    const error = new CurrencyMismatchError();
    expect(error).toBeInstanceOf(WealthError);
  });

  test('should use "Currency mismatch between values" as default message', () => {
    const error = new CurrencyMismatchError();
    expect(error.message).toBe('Currency mismatch between values');
  });

  test('should allow custom messages', () => {
    const error = new CurrencyMismatchError('Custom error message');
    expect(error.message).toBe('Custom error message');
  });
});
