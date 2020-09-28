const pool = require('../utils/pool');

module.exports = class User {
  id;
  email;
  passwordHash;
  profilePhotoUrl;
  
  constructor(row) {
    this.id = row.id;
    this.email = row.email;
    this.passwordHash = row.password_hash;
    this.profilePhotoUrl = row.profile_photo_url;

  }
  
  static async insert(user) {
    const { rows } = await pool.query(
      'INSERT INTO users (email, password_hash, profile_photo_url) VALUES ($1, $2, $3) RETURNING *',
      [user.email, user.passwordHash, user.profilePhotoUrl]
    );

    return new User(rows[0]);
    
  }

};
