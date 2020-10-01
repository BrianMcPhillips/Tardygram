const chance = require('chance').Chance();
const UserService = require('../lib/services/user-service');
const Post = require('../lib/models/post');



module.exports = async({ userCount = 5, postCount = 500 } = {}) => {
  await Promise.all([...Array(userCount)].map((_, i) => {
    return UserService.create({
      email:`test${i}@tester.com`,
      password: `password${i}`,
      profilePhotoURL: 'https://www.placekitten.com/200/200'
    });
  }));

  const posts = await Promise.all([...Array(postCount)].map(() => {
    return Post.insert({
      text: chance.sentence(),
      userId: chance.pickone(users).id
    });
  }));
};
