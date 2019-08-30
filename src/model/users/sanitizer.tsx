import validator from 'validator';
import { isPassword } from '../../lib/Polyfills';
import { SanitizerBase } from '../SanitizerBase';

class UserSanitizerClass extends SanitizerBase {
  fields: { [fieldName: string]: (any) => [any, string] } = {
    ...SanitizerBase.fieldsCore,
    roles: value => {
      if (typeof value !== 'string') return [value, 'roles is a non-string value'];

      let roles = JSON.parse(value);
      if (!Array.isArray(roles)) return [roles, 'roles is not a JSON array.'];
      for (let role of roles) {
        if (typeof role !== 'string')
          return [roles, `A non-string value is present in roles array`];
        if (!['admin', 'identified'].includes(role)) return [roles, `${role} is not a valid role.`];
      }
      return [value, null];
    },

    email: value => {
      if (typeof value !== 'string') return [value, 'email is a non-string value'];
      if (!validator.isEmail(value)) return [value, 'email is invalid.'];
      let sanitized = validator.normalizeEmail(value);
      return [sanitized, null];
    },

    password: value => {
      if (typeof value !== 'string') return [value, 'password is a non-string value'];
      if (value.length !== 60) {
        if (!isPassword(value))
          return [
            value,
            'Password fails strength tests: must contain a number, uppercase, lowercase, and special.'
          ];
      }
      return [value, null];
    },

    handle: value => {
      if (typeof value !== 'string') return [value, 'handle is a non-string value'];
      return [value, null];
    },

    nameGiven: value => {
      if (typeof value !== 'string') return [value, 'nameGiven is a non-string value'];
      if (!value.length) {
        return [value, 'nameGiven is required'];
      }
      return [value, null];
    },

    nameFamily: value => {
      if (typeof value !== 'string') return [value, 'nameFamily is a non-string value'];
      if (!value.length) {
        return [value, 'nameFamily is required'];
      }
      return [value, null];
    },

    avatar: value => {
      if (typeof value !== 'string') return [value, 'avatar is a non-string value'];
      if (value.length && !validator.isURL(value)) return [value, 'avatar is not a url'];
      return [value, null];
    },

    recentSearches: value => {
      if (typeof value !== 'string') return [value, 'recentSearches is a non-string value'];

      let recentSearches = JSON.parse(value);
      if (!Array.isArray(recentSearches))
        return [recentSearches, 'recentSearches is not a JSON array.'];
      for (let [role, i] of recentSearches) {
        if (typeof role !== 'string')
          return [recentSearches, `A non-string value is present in recentSearches.`];
      }

      return [value, null];
    }
  };
}
export const UserSanitizer = new UserSanitizerClass();
