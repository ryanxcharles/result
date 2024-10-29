import { describe, it, expect } from 'vitest';
import { Result, Ok, Err, isOk, isErr, asyncResult, syncResult } from '../src/index.js';

describe('Result Type Tests', () => {
  it('should create an Ok result with a value', () => {
    const result = Ok('success');
    expect(result).toEqual({ value: 'success', error: null });
  });

  it('should create an Err result with an error message', () => {
    const result = Err('something went wrong');
    expect(result).toEqual({ value: null, error: 'something went wrong' });
  });

  it('isOk should return true for an Ok result', () => {
    const result = Ok('test');
    expect(isOk(result)).toBe(true);
  });

  it('isOk should return false for an Err result', () => {
    const result = Err('error');
    expect(isOk(result)).toBe(false);
  });

  it('isErr should return true for an Err result', () => {
    const result = Err('error');
    expect(isErr(result)).toBe(true);
  });

  it('isErr should return false for an Ok result', () => {
    const result = Ok('test');
    expect(isErr(result)).toBe(false);
  });
});

describe('asyncResult Function Tests', () => {
  it('should return an Ok result for a successful promise', async () => {
    const promise = Promise.resolve('success');
    const result = await asyncResult(promise);
    expect(result).toEqual({ value: 'success', error: null });
  });

  it('should return an Err result for a rejected promise', async () => {
    const promise = Promise.reject(new Error('failure'));
    const result = await asyncResult(promise);
    expect(result).toEqual({ value: null, error: 'failure' });
  });

  it('should return an Err result for a rejected promise with a non-error object', async () => {
    const promise = Promise.reject('failure');
    const result = await asyncResult(promise);
    expect(result).toEqual({ value: null, error: 'An unknown error occurred: failure' });
  });
});

describe('syncResult Function Tests', () => {
  it('should return an Ok result when function executes successfully', () => {
    const fn = (a: number, b: number) => a + b;
    const result = syncResult(fn, 1, 2);
    expect(result).toEqual({ value: 3, error: null });
  });

  it('should return an Err result when function throws an error', () => {
    const fn = () => {
      throw new Error('oops');
    };
    const result = syncResult(fn);
    expect(result).toEqual({ value: null, error: 'oops' });
  });

  it('should return an Err result when function throws a non-error object', () => {
    const fn = () => {
      throw 'oops';
    };
    const result = syncResult(fn);
    expect(result).toEqual({ value: null, error: 'An unknown error occurred: oops' });
  });
});
