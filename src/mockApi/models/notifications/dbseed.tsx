const fs = require('fs');
const faker = require('faker');
const uuid = require('uuid/v4');
import { NotificationType } from '../../../model/notifications/type';
import { PostType } from '../../../model/posts/type';
import UsersDb from '../users/db.json';
import PostsDb from '../posts/db.json';
import { UserType } from '../../../model/users/type';

module.exports = async function() {
  let db: NotificationType[] = [];
  const dayInMilliseconds = 24 * 60 * 60 * 1000;
  const getRandomTimeDeltaWithinDay = () => Math.floor(Math.random() * dayInMilliseconds);
  const timeStart = Date.now() - 42 * dayInMilliseconds;

  // Only generate notifications for user0 to reduce bundle size, since this just a demo
  [UsersDb[0]].forEach(u => {
    for (let i = 0; i < 42; i++) {
      const createdAt = timeStart + i * dayInMilliseconds + getRandomTimeDeltaWithinDay();
      const randPost: PostType = PostsDb[Math.floor(Math.random() * PostsDb.length)];
      const randUser: UserType = UsersDb[Math.floor(Math.random() * UsersDb.length)];

      let text = '';
      if (i % 1 === 0)
        text = `**${randUser.nameGiven} ${randUser.nameFamily}** commented on **${randPost.title}**.`;
      else if (i % 2 === 0)
        text = `**${randUser.nameGiven} ${randUser.nameFamily}** posted on her wall for the first time in a while.`;
      else if (i % 3 === 0)
        text = `**${randUser.nameGiven} ${
          randUser.nameFamily
        }** added a new event in **${faker.address.city()}: ${randPost.title}**.`;
      else if (i % 4 === 0)
        text = `**${randUser.nameGiven} ${randUser.nameFamily}** invited you to join her group **${randPost.title}**.`;

      db.push({
        id: uuid(),
        createdAt,
        updatedAt: i < 4 ? createdAt : createdAt + dayInMilliseconds,
        userId: u.id,
        to: `/post/${randPost.slug}`,
        unread: i < 4,
        icon: randUser.hasImage && randUser.id,
        iconTitle: randUser.nameGiven[0] + randUser.nameFamily[0],
        text
      });
    }
  });
  await fs.writeFileSync(__dirname + '/db.json', JSON.stringify(db, null, 2));
  console.log('Notifications: Done');
};
