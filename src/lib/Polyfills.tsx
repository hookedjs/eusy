/**
 * Convenience Functions for dealing with primitive operations like comparisons,
 * searches, shortening, sleeping, etc.
 */

/**
 * Return an intersection array of two or multiple arrays
 *
 * Example: ArrayIntersection([1,2], [1]) => [1]
 */
export function ArrayIntersection(...arrays) {
  return arrays.reduce((a, b) => b.filter(Set.prototype.has.bind(new Set(a))));
}

/**
 * Return a promise that resolves after ms milliseconds
 *
 * Can be used in async functions to wait for stuff.
 *
 * For example,
 * while(checkIfTrue()) await Sleep(200);
 *
 */
export const Sleep = (ms: number) => {
  return new Promise(function(resolve) {
    setTimeout(resolve, ms);
  });
};

/**
 * Shorten string by character length with word boundary supported
 *
 * Example:
 * strShorten("We will win if we want", 11) -> "We will win..."
 *
 * Copied from npmjs.com/package/str_shorten and made Typescript friendly
 */
export function StringShorten(
  str: string,
  maxChars: number,
  options?: {
    wordBoundary?: boolean;
    endSymbols?: string;
  }
) {
  if (!str) return str;

  var _optionsDefault = {
    wordBoundary: true,
    endSymbols: '...'
  };
  var charRegx = /\s* \s*|\s*-\s*/;
  var words = str.split(charRegx);
  var retStr = '';

  options = Object.assign(_optionsDefault, options);

  function appendEndSymbols(
    strlen: number,
    maxChars: number,
    endSymbols?: string
  ) /* istanbul ignore next */ {
    return strlen > maxChars ? endSymbols : '';
  }

  if (!maxChars || str.length <= maxChars) {
    return str;
  }

  if (!options.wordBoundary) {
    return str.substring(0, maxChars) + appendEndSymbols(str.length, maxChars, options.endSymbols);
  }

  for (var i = 0; i < words.length; i++) {
    if ((retStr + ' ' + words[i]).length > maxChars) {
      return (
        str.substring(0, retStr.length) +
        appendEndSymbols(str.length, retStr.length, options.endSymbols)
      );
    } else {
      retStr = i === 0 ? words[0] : retStr + (' ' + words[i]);
    }
  }
  return '';
}

/**
 * Convenience function for searching strings for one or more matches,
 * and returns true or false.
 *
 * Compared to using indexOf, this makes code more readable, especially
 * when searching for multiple strings.
 *
 */
export const StringContains = (haystack: string, search: string | string[]) => {
  if (!Array.isArray(search)) search = [search];
  for (let s of search) {
    if (haystack.includes(s)) return true;
  }
  return false;
};

/**
 * Convenience function for searching arrays for one or more matches,
 * and returns true or false.
 *
 * Compared to using indexOf or includes, this makes code more readable, especially
 * when searching for multiple items.
 *
 */
export const ArrayContains = (haystack: any[], search: any | any[]) => {
  if (!Array.isArray(search)) search = [search];
  for (let s of search) {
    if (haystack.includes(s)) return true;
  }
  return false;
};

/**
 * Convenience function for searching objects if they contain one or more objects.
 * and returns true or false.
 */
export const ObjectContainsKey = (haystack: object, search: any | any[]) => {
  if (!Array.isArray(search)) search = [search];
  for (let s of search) {
    for (let k in haystack) {
      if (k === s) return true;
    }
  }
  return false;
};
export const ObjectContainsValue = (haystack: object, search: any | any[]) => {
  if (!Array.isArray(search)) search = [search];
  for (let s of search) {
    for (let k in haystack) {
      // @ts-ignore: ObjectContains: Ignore implicit any
      if (haystack[k] === s) return true;
    }
  }
  return false;
};

/**
 ^                         Start anchor
 (?=.*[A-Z].*[A-Z])        Ensure string has two uppercase letters.
 (?=.*[!@#$&*])            Ensure string has one special case letter.
 (?=.*[0-9].*[0-9])        Ensure string has two digits.
 (?=.*[a-z].*[a-z].*[a-z]) Ensure string has three lowercase letters.
 .{8}                      Ensure string is of length 8.
 */
export const isPassword = (subject: string) =>
  new RegExp(
    `^${[
      '(?=.*[A-Z])', // one uppercase
      '(?=.*[a-z])', // one lowercase
      '(?=.*[0-9])', // one number
      '.{8}' // min length
    ].join('')}`
  ).test(subject);
