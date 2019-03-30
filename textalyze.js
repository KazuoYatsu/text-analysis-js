const fs = require('fs');

/**
 * Given an input String, returns true if it's a valid string false otherwise
 * @param {String} string - The supposed string to be validated
 * @returns {Boolean} True if it is a string
 */
function isString(string) {
  return typeof string === 'string';
}

/**
 * Given an input Array, returns a Map containing the count of each item in the input.
 * @param {Array} array - The array of items to count
 * @returns {Map} A Map containing the counts of the items in the input array
 */
function itemCounts(array) {
  const counts = new Map();

  array.forEach((value) => {
    const count = counts.get(value) || 0;
    counts.set(value, count + 1);
  });

  return counts;
}

/**
 * Given an input String, returns an Array containing each letter
 * @param {String} string - The String to convert to array
 * @returns {Array} The Array containing the characters from the string
 */
function arrayFrom(string) {
  if (!isString(string)) {
    return [];
  }

  return string.split('');
}

/**
 * Given an input String, returns the string with only lower case a-z characters
 * @param {String} string - The String to be sanitized
 * @returns {String} The String sanitized
 */
function sanitize(string) {
  if (!isString(string)) {
    return '';
  }

  return string.toLowerCase().replace(/[^a-z]/gi, '');
}

/**
 * Given an input Map and total count of elements,
 * returns the object containing the percentage acording to total
 * @param {Map} counts - The map containing the counts for each value
 * @param {Number} total - The total count of elements
 * @returns {Map} The frequency in percentage of each value
 */
function getFrequencyStatistics(counts, total) {
  if (!counts || !(counts instanceof Map)) {
    return counts;
  }

  if (!total || Number.isNaN(total)) {
    return counts;
  }

  const statistics = new Map();

  counts.forEach((value, key) => {
    const percentage = value / total;
    statistics.set(key, percentage);
  });

  return statistics;
}

/**
 * Builds a string containing repetitions of histogramString
 * according to current value in comparison to maxValue
 * @param {Number} value - The current value
 * @param {Number} maxValue - The max value for param value
 * @param {String} histogramString - The string to compose the histogram bar
 * @param {Number} maxBarLength - The max amount of times histogramString can be repeated
 * @returns {String} The hitogram bar
 */
function getHistogramBar(value, maxValue, histogramString, maxBarLength) {
  const charCount = value * maxBarLength / maxValue;
  const histogramBar = histogramString.repeat(charCount);

  return histogramBar;
}

module.exports = {
  itemCounts,
  arrayFrom,
  sanitize,
  getFrequencyStatistics,
  getHistogramBar,
};

//
// running the app
//
function main(args) {
  const path = args[0];

  fs.readFile(path, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`The counts for "${path}" are...`);

    const sanitizedString = sanitize(data.toString());
    const array = arrayFrom(sanitizedString);
    const counts = itemCounts(array);
    const statistics = getFrequencyStatistics(counts, array.length);

    statistics.forEach((value, key) => {
      const humanReadablePercentage = (value * 100).toFixed(2);
      console.log(`${key}\t${humanReadablePercentage}%`);
    });
  });
}

if (require.main === module) {
  const args = process.argv.slice(2, process.argv.length);
  main(args);
}
