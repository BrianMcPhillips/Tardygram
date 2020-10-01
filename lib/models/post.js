const pool = require('../utils/pool');

module.exports = class Post {
  id;
  userId;
  photoUrl;
  caption;
  tags;

  constructor(row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.photoUrl = row.photo_url;
    this.caption = row.caption;
    this.tags = row.tags;
  }

  static async insert(post) {
    const { rows } = await pool.query(
      'INSERT INTO posts (user_id, photo_url, caption, tags) VALUES ($1, $2, $3, $4) RETURNING *',
      [post.userId, post.photoUrl, post.caption, post.tags]
    );

    return new Post(rows[0]);

  }

  static async findByUserId(userId) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE user_id=$1', [userId]
    );

    if(!rows[0]) return null;
    else return new Post(rows[0]);
  }


};
