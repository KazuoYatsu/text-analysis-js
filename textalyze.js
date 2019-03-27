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

module.exports = { itemCounts };

//
// running the app
//
if (require.main === module) {
  const array = ['a', 'b', 'b', 'c', 'c', 'a', 'd'];

  console.log(`The counts for ${array} are...`);

  itemCounts(array).forEach((value, key) => {
    console.log(`${key}\t${value}`);
  });
}
