/**
 * @desc get a record from sessionStorage according to specified key
 * @param {String} key
 * @return {Object} value
 */
const get = key => {
  const value = window.sessionStorage.getItem(key.toString());

  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};

/**
 * @desc add a record from sessionStorage according to specified key-value pair
 * @param {String | Number} key
 * @param {Object} value
 */
const set = (key, value) => window.sessionStorage.setItem(key.toString(), JSON.stringify(value));

/**
 * @desc remove a record from sessionStorage according to specified key
 * @param {String | Number} key
 */
const remove = key => window.sessionStorage.removeItem(key.toString());

/**
 * @desc remove all records from sessionStorage
 */
const clear = () => window.sessionStorage.clear();

export default { get, set, remove, clear };
