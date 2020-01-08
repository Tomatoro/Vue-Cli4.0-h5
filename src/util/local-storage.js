/**
 * @desc get a record from localStorage according to specified key
 * @param {String} key
 * @return {Object} value
 */
const get = key => {
  const value = window.localStorage.getItem(key.toString());

  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};

/**
 * @desc add a record from localStorage according to specified key-value pair
 * @param {String | Number} key
 * @param {Object} value
 */
const set = (key, value) => window.localStorage.setItem(key.toString(), JSON.stringify(value));

/**
 * @desc remove a record from localStorage according to specified key
 * @param {String | Number} key
 */
const remove = key => window.localStorage.removeItem(key.toString());

/**
 * @desc remove all records from localStorage
 */
const clear = () => window.localStorage.clear();

export default { get, set, remove, clear };
