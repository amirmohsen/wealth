import WealthError from '.';

describe('WealthError', () => {
  test('should use "Wealth error" as default message', () => {
    const error = new WealthError();
    expect(error.message).toBe('Wealth error');
  });

  test('should allow custom messages', () => {
    const error = new WealthError('Custom Wealth error');
    expect(error.message).toBe('Custom Wealth error');
  });
});
