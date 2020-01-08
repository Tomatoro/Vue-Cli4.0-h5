/**
 * @desc date time formatter
 * @param {*} date
 * @param {string} format, default 'yyyy-MM-dd'
 * @return {string}
 */
const format = (date, format = 'yyyy-MM-dd') => {
  if (!date) return '';

  switch (typeof date) {
    case 'string':
      date = new Date(date.replace(/-/, '/'));
      break;

    case 'number':
      date = new Date(date);
      break;
  }

  if (!(date instanceof Date)) return '';

  const dict = {
    'yyyy': date.getFullYear(),
    'M': date.getMonth() + 1,
    'd': date.getDate(),
    'H': date.getHours(),
    'm': date.getMinutes(),
    's': date.getSeconds(),
    'MM': ('' + (date.getMonth() + 101)).substr(1),
    'dd': ('' + (date.getDate() + 100)).substr(1),
    'HH': ('' + (date.getHours() + 100)).substr(1),
    'mm': ('' + (date.getMinutes() + 100)).substr(1),
    'ss': ('' + (date.getSeconds() + 100)).substr(1)
  };

  return format.replace(/(yyyy|MM?|dd?|HH?|mm?|ss?)/g, function() {
    return dict[arguments[0]];
  });
};

/**
 * @desc transform duration to readable string
 * @param {number} duration
 * @param {string} separator, default ':'
 * @return {string}
 */
const duration = (duration, separator = ':') => {
  let hours = Math.floor(duration / 3600);
  let mins = Math.floor(duration % 3600 / 60);
  let secs = parseInt(duration % 60);

  hours = hours < 10 ? `0${hours}` : hours;
  mins = mins < 10 ? `0${mins}` : mins;
  secs = secs < 10 ? `0${secs}` : secs;

  return `${hours}${separator}${mins}${separator}${secs}`;
};

export default { format, duration };
