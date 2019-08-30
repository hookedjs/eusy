const slugify = require('slugify');
import validator from 'validator';
import { SanitizerBase } from '../SanitizerBase';

class PostSanitizerClass extends SanitizerBase {
  fields: { [fieldName: string]: (any) => [any, string] } = {
    ...SanitizerBase.fieldsCore,
    userId: value => {
      if (typeof value !== 'string') return [value, 'userId is a non-string value'];
      else if (!validator.isUUID(value)) return [value, `userId is invalid`];
      return [value, null];
    },

    title: value => {
      if (typeof value !== 'string') return [value, 'title is a non-string value'];
      else if (!value.length) return [value, 'title is empty'];
      return [value, null];
    },

    slug: value => {
      if (typeof value !== 'string') return [value, 'slug is a non-string value'];
      else if (!value.length) {
        return [value, 'slug is empty'];
      }
      let sanitized = slugify(value);
      return [sanitized, null];
    },

    body: value => {
      if (typeof value !== 'string') return [value, 'body is a non-string value'];
      else if (!value.length) return [value, 'body is empty'];
      return [value, null];
    },

    image: value => {
      if (typeof value !== 'string') return [value, 'image is a non-string value'];
      else if (value.length && !validator.isURL(value)) return [value, 'image is not a url'];
      return [value, null];
    }
  };
}
export const PostSanitizer = new PostSanitizerClass();
