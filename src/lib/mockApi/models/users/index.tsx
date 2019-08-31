import { BaseModel } from '../BaseModel';
import { UserSanitizer } from '../../../../model/users/sanitizer';
import { UserType as modelType } from '../../../../model/users/type';
import seed from './db.json';

export class UserModel extends BaseModel {
  db: modelType[] = seed;

  sanitizers: { [fieldName: string]: (any) => [any, string] } = {
    // Client-side validations
    ...UserSanitizer.fields,

    // Add server-side validations where required
    email: value => {
      let [sanitized, error] = UserSanitizer.fields.email(value);
      if (!error && this.db.findIndex(user => user.email === sanitized) !== -1)
        error = `email is already claimed: ${value}`;
      return [sanitized, error];
    },
    password: value => {
      let [sanitized, error] = UserSanitizer.fields.password(value);
      // In a real backend, you should hash the password here.
      // sanitized =
      //   typeof sanitized === 'string' && bcrypt.hashSync(sanitized, bcrypt.genSaltSync(10));
      return [sanitized, error];
    },
    handle: value => {
      let [sanitized, error] = UserSanitizer.fields.handle(value);
      let handleBase = sanitized;
      let postFix = 2;
      while (this.db.find(user => user.handle === sanitized)) {
        sanitized = handleBase + postFix++;
      }
      return [sanitized, error];
    }
  };

  login = ({ email, password }: { email: string; password: string }) => {
    let user = this.db.find(row => row.email === email);
    // In a real backend, password would be hashed so you'd need to compare hashes.
    // if (!user || !bcrypt.compareSync(password, user.password))
    if (!user || password !== user.password)
      return { error: `login: Email not found and/or password doesn't match.` };
    return { data: { id: user.id, roles: user.roles, token: 'tokenplaceholder' } };
  };
}
