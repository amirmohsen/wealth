import InvalidCurrencyError from '.';
import WealthError from '../WealthError';

describe('InvalidCurrencyError', () => {

  test('should extend "WealthError"', () => {
    const error = new InvalidCurrencyError();
    expect(error).toBeInstanceOf(WealthError);
  });

  test('should use "Invalid currency" as default message', () => {
    const error = new InvalidCurrencyError();
    expect(error.message).toBe('Invalid currency');
  });

  test('should allow custom messages', () => {
    const error = new InvalidCurrencyError('Custom error message');
    expect(error.message).toBe('Custom error message');
  });
});
