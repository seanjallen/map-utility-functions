import { assign } from '../src';

const key1 = 'a';
const key2 = 'b';
const key3 = 'c';
const key4 = 'd';

const value1 = 1;
const value2 = 2;
const value3 = 3;
const value4 = 4;


test('returns the given map passed as the first argument', () => {
  const testMap = new Map();
  expect(assign(testMap)).toBe(testMap);
});
test('copies all keys from the source maps into the target map', () => {
  const targetMap = new Map();
  const sourceMap1 = new Map([[key1, value1], [key2, value2]]);
  const sourceMap2 = new Map([[key3, value3], [key4, value4]]);
  assign(targetMap, sourceMap1, sourceMap2);
  expect(targetMap.size).toBe(sourceMap1.size + sourceMap2.size);
  expect(targetMap.get(key1)).toBe(value1);
  expect(targetMap.get(key2)).toBe(value2);
  expect(targetMap.get(key3)).toBe(value3);
  expect(targetMap.get(key4)).toBe(value4);
});
test('overwrites keys from the target with keys from the sources', () => {
  const targetMap = new Map([[key1, value1]]);
  const sourceMap = new Map([[key1, value2]]);
  assign(targetMap, sourceMap);
  expect(targetMap.size).toBe(1);
  expect(targetMap.get(key1)).toBe(value2);
});
test('overwrites keys from earlier sources with keys from later sources', () => {
  const targetMap = new Map();
  const sourceMap1 = new Map([[key1, value1]]);
  const sourceMap2 = new Map([[key1, value2]]);
  assign(targetMap, sourceMap1, sourceMap2);
  expect(targetMap.size).toBe(1);
  expect(targetMap.get(key1)).toBe(value2);
});
test('keeps keys in the target map that were not overridden from the sources', () => {
  const targetMap = new Map([[key1, value1]]);
  const sourceMap = new Map([[key2, value2]]);
  assign(targetMap, sourceMap);
  expect(targetMap.size).toBe(2);
  expect(targetMap.get(key1)).toBe(value1);
});
