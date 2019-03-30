const { itemCounts, arrayFrom, sanitize, getFrequencyStatistics } = require('../textalyze');

describe('itemCount', () => {
  test('returns a count of the strings in the array', () => {
    const input = ['one', 'two', 'three', 'one', 'two', 'ZZZZ'];
    const expectedOutput = new Map([['one', 2], ['two', 2], ['three', 1], ['ZZZZ', 1]]);

    expect(itemCounts(input)).toEqual(expectedOutput);
  });

  test('returns an empty hash when array is empty', () => {
    const input = [];
    const expectedOutput = new Map();

    expect(itemCounts(input)).toEqual(expectedOutput);
  });

  test('counts multiple words', () => {
    const input = ['hi', 'hi', 'hi'];
    const expectedOutput = new Map([['hi', 3]]);

    expect(itemCounts(input)).toEqual(expectedOutput);
  });

  test('handles non-string inputs', () => {
    const input = ['null', null, '10', 10];
    const expectedOutput = new Map([['null', 1], [null, 1], ['10', 1], [10, 1]]);

    expect(itemCounts(input)).toEqual(expectedOutput);
  });

  test('is case-sensitive', () => {
    const input = ['a', 'A', 'a', 'A'];
    const expectedOutput = new Map([['a', 2], ['A', 2]]);

    expect(itemCounts(input)).toEqual(expectedOutput);
  });
});

describe('arrayFrom', () => {
  test('handles non-string inputs', () => {
    const input = 1234;
    const expectedOutput = [];

    expect(arrayFrom(input)).toEqual(expectedOutput);
  });

  test('handles undefined inputs', () => {
    const input = undefined;
    const expectedOutput = [];

    expect(arrayFrom(input)).toEqual(expectedOutput);
  });

  test('returns string an array of characters from a string', () => {
    const input = 'Hello world';
    const expectedOutput = ['H', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd'];

    expect(arrayFrom(input)).toEqual(expectedOutput);
  });
});

describe('sanitize', () => {
  test('handles non-string inputs', () => {
    const input = 1234;
    const expectedOutput = '';

    expect(sanitize(input)).toEqual(expectedOutput);
  });

  test('handles undefined inputs', () => {
    const input = undefined;
    const expectedOutput = '';

    expect(sanitize(input)).toEqual(expectedOutput);
  });

  test('returns the sanitized string', () => {
    const input = 'Hello World';
    const expectedOutput = 'hello world';

    expect(sanitize(input)).toEqual(expectedOutput);
  });
});

describe('updateToFrequencyStatistics', () => {
  test('returns the percentage', () => {
    const inputMap = new Map([['a', 2], ['A', 2]]);
    const inputTotal = 4;
    const expectedOutput = new Map([['a', 0.5], ['A', 0.5]]);

    expect(getFrequencyStatistics(inputMap, inputTotal)).toEqual(expectedOutput);
  });

  test('handles non map input', () => {
    const inputMap = 123456;
    const inputTotal = 4;
    const expectedOutput = 123456;

    expect(getFrequencyStatistics(inputMap, inputTotal)).toEqual(expectedOutput);
  });

  test('handles non numeric input', () => {
    const inputMap = new Map([['a', 2], ['A', 2]]);
    const inputTotal = 'four';
    const expectedOutput = new Map([['a', 2], ['A', 2]]);

    expect(getFrequencyStatistics(inputMap, inputTotal)).toEqual(expectedOutput);
  });

  test('handles undefined instead of map', () => {
    const inputMap = undefined;
    const inputTotal = 4;
    const expectedOutput = undefined;

    expect(getFrequencyStatistics(inputMap, inputTotal)).toEqual(expectedOutput);
  });

  test('handles undefined instead of total', () => {
    const inputMap = new Map([['a', 2], ['A', 2]]);
    const inputTotal = undefined;
    const expectedOutput = new Map([['a', 2], ['A', 2]]);

    expect(getFrequencyStatistics(inputMap, inputTotal)).toEqual(expectedOutput);
  });
});
