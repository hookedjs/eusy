const slugify = require('slugify');
import { BaseModel } from '../BaseModel';

const UserApi = require('../users');
import seed from './db.json';
import { PostType as modelType } from '../../../model/posts/type';
import { PostSanitizer } from '../../../model/posts/sanitizer';

export class PostModel extends BaseModel {
  db: modelType[] = seed;
  searchFields = [
    { name: 'title', boost: 10 },
    { name: 'body', boost: 20 },
    { name: 'userId', boost: 1 }
  ];

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
        let sanitized = slugify(value, { lower: true });
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

  constructor() {
    super();
    this.initSearchService();
  }
}
