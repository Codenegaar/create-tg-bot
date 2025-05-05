/**
 * Convert a 1-dimensional array into a 2-dimensional array,
 * primarily used for converting a list of keyboard buttons
 * into a table of keyboard buttons
 * @param array Array to convert
 * @param columns Columns of the new table
 * @returns Tabular representation of the array
 */
export function splitArray<T>(array: T[], columns: number): T[][] {
  return array.reduce<T[][]>(
    (prev, current) => {
      if (prev[prev.length - 1].length < columns) {
        prev[prev.length - 1].push(current);
      } else {
        prev.push([current]);
      }
      return prev;
    },
    [[]],
  );
}
