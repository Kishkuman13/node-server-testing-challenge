const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');
const User = require('./users/users-model');
const { testing } = require('../knexfile');

describe('server.js', () => {
  beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
  });

  beforeEach(async () => {
    await db('users').truncate();
  });

  afterAll(async () => {
    await db.destroy();
  });

  describe('[GET] /users', () => {
    it('returns array of users', async() => {
      await db.seed.run();

      const res = await request(server).get('/users');
      expect(res.body).toHaveLength(4);

      res.body.forEach(user => {
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('name');
      });
    });
  });


});