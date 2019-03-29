const fs = require('fs');

/**
 * Given an input String, returns true if it's a valid string false otherwise
 * @param {String} string - The String to be sanitized
 * @returns {Boolean} The String sanitized
 */
function isString(string) {
  return typeof string !== 'string';
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
  if (isString(string)) {
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
  if (isString(string)) {
    return '';
  }

  return string.toLowerCase().replace(/[^a-z]/gi, '');
}

/**
 * Given an input Map and total count of elements,
 * returns the object containing the percentage acording to total
 * @param {Map} counts - The map containing the counts for each value
 * @param {Number} total - The total count of elements
 * @param {Boolean} sorted - If the return must be sorted
 * @returns {Map} The frequency in percentage of each value
 */
function getFrequencyStatistics(counts, total, sorted) {
  if (!counts || !(counts instanceof Map)) {
    return counts;
  }

  if (!total || Number.isNaN(Number(total))) {
    return counts;
  }

  let statistics = new Map();

  counts.forEach((value, key) => {
    const percentage = value / total;
    statistics.set(key, percentage);
  });

  if (sorted) {
    statistics = new Map([...statistics.entries()].sort());
  }

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
/**
 * Runs the main application
 * @param {String []} args - The args
 */
function main(argv) {
  const path = argv[2];
  const histogramString = argv[3] || '-';

  fs.readFile(path, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const sanitizedString = sanitize(data.toString());
    const array = arrayFrom(sanitizedString);
    const counts = itemCounts(array);
    const sorted = true;
    const statistics = getFrequencyStatistics(counts, array.length, sorted);
    const maxValue = Math.max(...statistics.values());

    console.log(`The counts for "${path}" are...`);

    statistics.forEach((value, key) => {
      const humanReadablePercentage = (value * 100).toFixed(2).padStart(5, ' ');
      const histogramBar = getHistogramBar(value, maxValue, histogramString, 80);

      console.log(`${key} [ ${humanReadablePercentage}% ] ${histogramBar}`);
    });
  });
}

if (require.main === module) {
  main(process.argv);
}
