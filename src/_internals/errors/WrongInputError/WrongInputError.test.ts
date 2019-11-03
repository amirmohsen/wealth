import WrongInputError from '.';
import WealthError from '../WealthError';

describe('WrongInputError', () => {
  test('should extend "WealthError"', () => {
    const error = new WrongInputError();
    expect(error).toBeInstanceOf(WealthError);
  });

  test('should use "Wrong input argument" as default message', () => {
    const error = new WrongInputError();
    expect(error.message).toBe('Wrong input argument');
  });

  test('should allow custom messages', () => {
    const error = new WrongInputError('Custom error message');
    expect(error.message).toBe('Custom error message');
  });
});
