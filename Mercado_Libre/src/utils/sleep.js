/**
 *
 * @param {miliseconds} ms
 * @returns any
 */
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
