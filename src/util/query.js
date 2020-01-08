/**
 * serialize key-value object to query string
 * @param {object} queryObj
 * @return {string} queryStr
 */
const serialize = queryObj => {
  let queryStr = '';

  for (const key in queryObj) {
    if (queryObj.hasOwnProperty(key)) {
      queryStr += `${encodeURIComponent(key)}=${encodeURIComponent(queryObj[key])}&`;
    }
  }

  return queryStr.slice(0, queryStr.length - 1);
};

export default { serialize };
