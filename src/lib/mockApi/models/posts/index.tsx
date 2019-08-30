const slugify = require('slugify');
import { BaseModel } from '../BaseModel';
const UserApi = require('../users');
import seed from './db.json';
import { PostType as modelType } from '../../../../model/posts/type';
import { PostSanitizer } from '../../../../model/posts/sanitizer';

export class PostsModel extends BaseModel {
  db: modelType[] = seed;

  sanitizers: { [fieldName: string]: (any) => [any, string] } = {
    // Client-side validations
    ...PostSanitizer.fields,

    // Add server-side validations where required
    userId: value => {
      let [sanitized, error] = PostSanitizer.fields.userId(value);
      if (!error && !UserApi.db[sanitized]) error = `userId not found: ${value}`;
      return [sanitized, error];
    },
    slug: value => {
      let [sanitized, error] = PostSanitizer.fields.slug(value);
      if (!error) {
        let sanitized = slugify(value);
        if (this.db.find(post => post.slug === sanitized)) {
          let slugBase = sanitized;
          let postFix = 2;
          while (this.db.find(post => post.slug === sanitized))
            sanitized = slugBase + '_' + postFix++;
        }
      }
      return [sanitized, error];
    }
  };
}
