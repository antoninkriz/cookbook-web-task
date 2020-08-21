/**
 * Init array of certain size of undefined elements
 * @param n Number of items of the array
 * @return {any[]} Empty array of length n
 */
export const initArray = (n) => new Array(n).fill(undefined);

/**
 * Init a sequence of integers from 0 to n-1
 * @param n Number of items of the array
 * @return {number[]} Sequence of length of n
 */
export const initArrayIntegers = (n) => initArray(n).map((_, i) => i);