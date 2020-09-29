const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/user-service');
const { profile } = require('console');

describe('Tardygram routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('signs up a user via POST', async() => {
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
        profilePhotoUrl: 'https://www.placecage.com/200/200'
      });

    
    
    expect(response.body).toEqual({
      id: expect.any(String),
      email: 'test@test.com',
      profilePhotoUrl: 'https://www.placecage.com/200/200'
    });
  });

  it('logs in a user via POST', async() => {
    const user = await UserService.create({ 
      email: 'test@test.com', 
      password: 'password',
      profilePhotoUrl: 'https://www.placecage.com/200/200'
    });

    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@test.com',
        password: 'password',
        profilePhotoUrl: 'https://www.placecage.com/200/200'
        
      });

    expect(response.body).toEqual({
      id: user.id,
      email: 'test@test.com',
      profilePhotoUrl: 'https://www.placecage.com/200/200'
      
    });
  });
});
