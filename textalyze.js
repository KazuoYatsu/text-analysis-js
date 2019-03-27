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
  if (!string || typeof string !== 'string') {
    return [];
  }

  return string.split('');
}
module.exports = { itemCounts, arrayFrom };

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
