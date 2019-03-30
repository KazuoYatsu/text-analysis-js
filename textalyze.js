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
 * Given an input String, returns the string with only lower case characters
 * @param {String} string - The String to be sanitized
 * @returns {String} The String sanitized
 */
function sanitize(string) {
  if (!isString(string)) {
    return '';
  }

  return string.toLowerCase();
}

module.exports = { itemCounts, arrayFrom, sanitize };

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

    itemCounts(array).forEach((value, key) => {
      console.log(`${key}\t${value}`);
    });
  });
}

if (require.main === module) {
  const args = process.argv.slice(2, process.argv.length);
  main(args);
}
