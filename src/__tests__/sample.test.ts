describe('Sample Test Suite', () => {
  test('should add two numbers correctly', () => {
    const result = 2 + 2;
    expect(result).toBe(4);
  });

  test('should handle string concatenation', () => {
    const greeting = 'Hello' + ' ' + 'World';
    expect(greeting).toBe('Hello World');
  });

  test('should work with arrays', () => {
    const numbers = [1, 2, 3, 4, 5];
    expect(numbers).toHaveLength(5);
    expect(numbers).toContain(3);
  });
});
