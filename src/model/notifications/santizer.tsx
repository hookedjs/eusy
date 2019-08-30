import validator from 'validator';
import { SanitizerBase } from '../SanitizerBase';

class NotificationSanitizerClass extends SanitizerBase {
  fields: { [fieldName: string]: (any) => [any, string] } = {
    ...SanitizerBase.fieldsCore,
    userId: value => {
      if (typeof value !== 'string') return [value, 'userId is a non-string value'];
      else if (!validator.isUUID(value)) return [value, `userId is invalid`];
      return [value, null];
    },

    to: value => {
      if (typeof value !== 'string') return [value, 'to is a non-string value'];
      else if (!validator.isURL('http://any.co' + value)) return [value, 'to is invalid'];
      return [value, null];
    },

    unread: value => {
      if (typeof value !== 'boolean') return [value, 'to is a non-boolean value'];
      return [value, null];
    },

    icon: value => {
      if (typeof value !== 'string') return [value, 'icon is a non-string value'];
      else if (value.length && !validator.isURL(value)) return [value, 'icon is not a url'];
      return [value, null];
    },

    text: value => {
      if (typeof value !== 'string') return [value, 'text is a non-string value'];
      else if (!value.length) return [value, 'text is empty'];
      return [value, null];
    }
  };
}
export const NotificationSanitizer = new NotificationSanitizerClass();
