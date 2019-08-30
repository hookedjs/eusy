import { BaseModel } from '../BaseModel';
const UserApi = require('../users');
import seed from './db.json';
import { NotificationType as modelType } from '../../../../model/notifications/type';
import { NotificationSanitizer } from '../../../../model/notifications/santizer';

export class NotificationModel extends BaseModel {
  db: modelType[] = seed;

  sanitizers: { [fieldName: string]: (any) => [any, string] } = {
    // Client-side validations
    ...NotificationSanitizer.fields,

    // Add server-side validations where required
    userId: value => {
      let [sanitized, error] = NotificationSanitizer.fields.userId(value);
      if (!error && !UserApi.db[sanitized]) error = `userId not found: ${value}`;
      return [sanitized, error];
    }
  };
}
