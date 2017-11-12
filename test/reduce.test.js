import { reduce } from '../src';

const key1 = 1;
const key2 = 2;
const key3 = 3;
const key4 = 4;

const value1 = 5;
const value2 = 6;
const value3 = 7;
const value4 = 8;

const map = new Map([[key1, value1], [key2, value2], [key3, value3], [key4, value4]]);

const callback = jest.fn().mockImplementation((accumulator, value, key) => accumulator + value + key);
let sum;
beforeAll(() => sum = reduce(map, callback, 0));

test('reduces key/value pairs as expected for a basic sum callback', () => {
  expect(sum).toBe(key1 + key2 + key3 + key4 + value1 + value2 + value3 + value4);
});
test('passes initial value to the first run of the callback', () => {
  expect(callback.mock.calls[0][0]).toBe(0);
});
test('passes undefined if no initial value is given', () => {
  const testMap = new Map([[key1, value1]]);
  const testCallback = jest.fn();
  expect(reduce(testMap, testCallback)).toBeUndefined();
});
test('calls each run of the callback with the expected input', () => {
  expect(callback.mock.calls[0]).toEqual(expect.arrayContaining([0, value1, key1, map]));
  expect(callback.mock.calls[1]).toEqual(expect.arrayContaining([key1 + value1, value2, key2, map]));
  expect(callback.mock.calls[2]).toEqual(expect.arrayContaining([key1 + value1 + key2 + value2, value3, key3, map]));
  expect(callback.mock.calls[3]).toEqual(expect.arrayContaining([key1 + value1 + key2 + value2 + key3 + value3, value4, key4, map]));
});