/**
 * Helper function to build class name from an object
 * @param {{[string]: boolean}} obj Object with class names as keys and boolean values
 * @return {string} Class name string
 */
export default (obj) => Object.keys(obj).map(k => !!obj[k] ? k : '').filter(c => c !== '').join(' ');
