import { Calculator } from './testservice';

describe('testservice', () => {
  it('should add 2 numbers', () => {
    const service = new Calculator();
    expect(service.add(2, 2)).toBe(4);
  });

  it('should substract 2 numbers', () => {
    const service = new Calculator();
    expect(service.sub(2, 2)).toBe(0);
  });

  it('should multiply 2 numbers', () => {
    const service = new Calculator();
    expect(service.multi(3, 2)).toBe(6);
  });

  it('should divide 2 numbers', () => {
    const service = new Calculator();
    expect(service.div(4, 2)).toBe(2);
  });
});
