describe('Some description of the module', () => {
  const add = (a: number, b: number) => a + b;
  test('Some other description', () => {
    expect(add(2, 3)).toEqual(5);
  });
});
