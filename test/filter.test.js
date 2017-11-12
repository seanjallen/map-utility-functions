import { filter } from '../src';

const key1 = 1;
const key2 = 2;
const key3 = 3;
const key4 = 4;

const value1 = 5;
const value2 = 6;
const value3 = 7;
const value4 = 8;

const startMap = new Map([[key1, value1], [key2, value2], [key3, value3], [key4, value4]]);
const callback = jest.fn().mockImplementation((value, key) => key === key2 || key === key4);
const filteredMap = filter(startMap, callback);

test('returns a new map instance', () => {
  expect(startMap).not.toBe(filteredMap);
});
test('the new map contains all key/value pairs where the callback returned true', () => {
  expect(filteredMap.size).toBe(2);
  expect(filteredMap.get(key2)).toBe(value2);
  expect(filteredMap.get(key4)).toBe(value4);
});
test('calls the callback with the given thisArg as the context for the function', () => {
  expect(startMap.size).toBeGreaterThan(0); // Check that we're actually testing something
  expect(filter(startMap, jest.fn().mockReturnThis(), true).size).toBe(startMap.size);
  expect(filter(startMap, jest.fn().mockReturnThis(), false).size).toBe(0);
});
test('calls the callback with null as the context when no thisArg is given', () => {
  let callbackContext;
  const thisArg = 'hello';
  filter(startMap, function() {
    callbackContext = this;
    return true;
  }, thisArg);
  expect(callbackContext).toBe(thisArg);
});
test('calls each run of the callback with the expected input', () => {
  expect(callback.mock.calls[0]).toEqual(expect.arrayContaining([value1, key1, startMap]));
  expect(callback.mock.calls[1]).toEqual(expect.arrayContaining([value2, key2, startMap]));
  expect(callback.mock.calls[2]).toEqual(expect.arrayContaining([value3, key3, startMap]));
  expect(callback.mock.calls[3]).toEqual(expect.arrayContaining([value4, key4, startMap]));
});