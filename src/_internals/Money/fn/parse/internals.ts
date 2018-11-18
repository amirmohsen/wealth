/**
 * Replace all case-insensitive instances of a string in another string
 * @param source - source string
 * @param search - search string
 * @param replacement - replacement string
 * @returns - final string result
 */
const replaceAllStringInstances = (source: string, search: string, replacement: string) => {
  const
    esc = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'),
    reg = new RegExp(esc, 'ig');
  return source.replace(reg, replacement);
};

/**
 * Replace multiple strings in another string
 * @param source - source string
 * @param group - search and replace string dictionary
 * @returns - final string result
 */
export const replaceMultipleStrings = (source: string, group: { [key: string]: string }) => {
  let result = source;
  for (const [search, replace] of Object.entries(group)) {
    result = replaceAllStringInstances(result, search, replace);
  }
  return result;
};
