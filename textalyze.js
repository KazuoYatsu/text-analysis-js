/**
 * Given an input String, returns true if it's a valid string false otherwise
 * @param {String} string - The String to be sanitized
 * @param {Boolean} isString - The String sanitized
 */
function validateString(string) {
  return typeof string !== 'string';
}

/**
 * Given an input Array, returns a Map containing the count of each item in the input.
 * @param {Array} array - The array of items to count
 * @param {Map} counts - A Map containing the counts of the items in the input array
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
 * @param {Array} array - The Array containing the characters from the string
 */
function arrayFrom(string) {
  if (validateString(string)) {
    return [];
  }

  return string.split('');
}

/**
 * Given an input String, returns the string with only lower case characters
 * @param {String} string - The String to be sanitized
 * @param {String} sanitizedString - The String sanitized
 */
function sanitize(string) {
  if (validateString(string)) {
    return '';
  }

  return string.toLowerCase();
}

module.exports = { itemCounts, arrayFrom, sanitize };

//
// running the app
//
if (require.main === module) {
  const string = 'Hello World';
  const array = arrayFrom(string);

  console.log(`The counts for "${string}" are...`);

  itemCounts(array).forEach((value, key) => {
    console.log(`${key}\t${value}`);
  });
}
