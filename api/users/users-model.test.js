const db = require('../../data/dbConfig');
const User = require('./users-model');

describe('user model', () => {
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

  describe('get()', () => {
    it('returns empty array when no users', async() => {
      const users = await User.get();

      expect(users).toEqual([]);
    });
    it('returns array of users when they exist', async() => {
      await db.seed.run();

      const users = await User.get();

      expect(users.length).toBe(4);
    })
  });

  describe('insert()', () => {
    it('creates new user', async() => {
      const user = await User.insert({ name: 'Eddy' });

      expect(user).toMatchObject({ name: 'Eddy' });
    });
  });

  describe('getById()', () => {
    it('returns specified user if exists', async() => {
      const { id } = await User.insert({ name: 'Eddy' });
      const user = await User.getById(id);

      expect(user).toMatchObject({ name: 'Eddy' });
    });
    it('returns undefined when user does not exist', async() => {
      const res = await User.getById('999');

      expect(res).toBeUndefined();
    });
  });

  describe('update()', () => {
    it('updates existing user', async() => {
      const { id } = await User.insert({ name: 'Eddy' });
      await User.update(id, {name: 'Eddie' });
      const user = await User.getById(id);

      expect(user).toMatchObject({ name: 'Eddie' });
    });
    it('returns undefined if user does not exist', async() => {
      const res = await User.update('999', {name: 'Eddy'});

      expect(res).toBeUndefined();
    });
  });

  describe('remove()', () => {
    it('removes user record', async() => {
      const { id } = await User.insert({ name: 'Eddy' });
      await User.remove(id);

      expect(await User.getById(id)).toBeUndefined();
    });
    it('returns undefined if record does not exist', async() => {
      const res = await User.remove('999');

      expect(res).toBe(0);
    })
  })


});