import { some } from '../src';

const key1 = 1;
const key2 = 2;
const key3 = 3;
const key4 = 4;

const value1 = 5;
const value2 = 6;
const value3 = 7;
const value4 = 8;

const map = new Map([[key1, value1], [key2, value2], [key3, value3], [key4, value4]]);
const callback = jest.fn().mockImplementation((value, key) => key === key2);

test('returns true if the callback returns true for any key/value pair', () => {
  expect(some(map, (value, key) => key === key2)).toBeTruthy();
});
test('returns false if the callback returns false for all key/value pairs', () => {
  expect(some(map, () => false)).not.toBeTruthy();
});
test('short circuits after the callback returns true for a single key/value pair', () => {
  const callback = jest.fn().mockImplementation((value, key) => key === key2);
  some(map, callback);
  expect(callback.mock.calls.length).toBe(2);
});
test('calls the callback with the given thisArg as the context for the function', () => {
  expect(some(map, jest.fn().mockReturnThis(), true)).toBeTruthy();
  expect(some(map, jest.fn().mockReturnThis(), false)).not.toBeTruthy();
});
test('calls the callback with null as the context when no thisArg is given', () => {
  let callbackContext;
  const thisArg = 'hello';
  some(map, function() {
    callbackContext = this;
    return true;
  }, thisArg);
  expect(callbackContext).toBe(thisArg);
});
test('calls each run of the callback with the expected input', () => {
  const callback = jest.fn().mockImplementation(() => false);
  some(map, callback);
  expect(callback.mock.calls[0]).toEqual(expect.arrayContaining([value1, key1, map]));
  expect(callback.mock.calls[1]).toEqual(expect.arrayContaining([value2, key2, map]));
  expect(callback.mock.calls[2]).toEqual(expect.arrayContaining([value3, key3, map]));
  expect(callback.mock.calls[3]).toEqual(expect.arrayContaining([value4, key4, map]));
});