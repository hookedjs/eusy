const fs = require('fs');
const faker = require('faker');
const uuid = require('uuid/v4');
import validator from 'validator';
import { UserType } from '../../../../model/users/type';

module.exports = async function() {
  let db: UserType[] = [];
  const dayInMilliseconds = 24 * 60 * 60 * 1000;
  const getRandomTimeDeltaWithinDay = () => Math.floor(Math.random() * dayInMilliseconds);
  const timeStart = Date.now() - 200 * dayInMilliseconds;

  for (let i = 0; i < 50; i++) {
    const userCard = faker.helpers.contextualCard();
    userCard.nameFamily = faker.name.lastName();
    const createdAt = timeStart + i * dayInMilliseconds + getRandomTimeDeltaWithinDay();

    // Gen a unique handle
    const handleBase = (userCard.name + userCard.nameFamily).replace(/ /g, '');
    let handle = handleBase;
    let j = 2;
    while (db.find(user => user.handle === handle)) {
      handle = handleBase + j++;
    }

    db.push({
      id: uuid(),
      createdAt,
      updatedAt: createdAt + dayInMilliseconds,
      roles: JSON.stringify([i === 0 ? 'admin' : 'identified']),
      email: validator.normalizeEmail(userCard.email),
      password: '$2y$12$3u.k4UNQOhrHedlGpSl4Z./l6dJ370ks5DdyZUh3qzdAFQvZcypiW', // 'password'
      avatar: userCard.avatar,
      nameGiven: userCard.name,
      nameFamily: userCard.nameFamily,
      handle,
      recentSearches: JSON.stringify(['beaches'])
    });
  }
  await fs.writeFileSync(__dirname + '/db.json', JSON.stringify(db, null, 2));
  console.log('Users: Done');
};
