const replaceAllStringInstances = (source: string, search: string, replacement: string): string => {
  const esc = search.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  const reg = new RegExp(esc, 'ig');
  return source.replace(reg, replacement);
};

const replaceMultipleStrings = (source: string, group: { [key: string]: string }): string => {
  let result = source;
  for (const [search, replace] of Object.entries(group)) {
    result = replaceAllStringInstances(result, search, replace);
  }
  return result;
};

export default replaceMultipleStrings;
