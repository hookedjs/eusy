import { UserModel } from './models/users';
import { PostModel } from './models/posts';
import { NotificationModel } from './models/notifications';

export const MockOrm = {
  users: new UserModel(),
  posts: new PostModel(),
  notifications: new NotificationModel()
};
