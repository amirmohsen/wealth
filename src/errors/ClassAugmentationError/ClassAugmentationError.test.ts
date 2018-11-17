import ClassAugmentationError from '.';
import WealthError from '../WealthError';

describe('ClassAugmentationError', () => {

  test('should extend "WealthError"', () => {
    const error = new ClassAugmentationError();
    expect(error).toBeInstanceOf(WealthError);
  });

  test('should use "Class augmentation error" as default message', () => {
    const error = new ClassAugmentationError();
    expect(error.message).toBe('Class augmentation error');
  });

  test('should allow custom messages', () => {
    const error = new ClassAugmentationError('Custom error message');
    expect(error.message).toBe('Custom error message');
  });
});
