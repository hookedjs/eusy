import { UserModel } from './models/users';
import { PostsModel } from './models/posts';
import { NotificationModel } from './models/notifications';

export const MockOrm = {
  users: new UserModel(),
  posts: new PostsModel(),
  notifications: new NotificationModel()
};
