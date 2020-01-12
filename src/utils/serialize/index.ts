import safeSerialize from 'fast-safe-stringify';
import { stripIndent } from 'common-tags';

const serialize = (literals: TemplateStringsArray, ...expressions: any[]): string => {
  let result = '';

  for (const [index, literal] of literals.entries()) {
    result += literal;
    if (index > 0) {
      result += safeSerialize(expressions[index]);
    }
  }

  return stripIndent`${result}`;
};

export default serialize;
