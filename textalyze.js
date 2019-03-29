/**
 * Given an input String, returns true if it's a valid string false otherwise
 * @param {String} string - The String to be sanitized
 * @returns {Boolean} The String sanitized
 */
function validateString(string) {
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
  if (validateString(string)) {
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

  console.log(`The counts for "${string}" are...`);

  const sanitizedStirng = sanitize(string);
  const array = arrayFrom(sanitizedStirng);

  itemCounts(array).forEach((value, key) => {
    console.log(`${key}\t${value}`);
  });
}
