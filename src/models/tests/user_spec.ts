import { UserStore } from '../user';

const store = new UserStore();

describe('User Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('create method should add a user', async () => {
    const result = await store.create({
      first_name: 'Nam',
      last_name: 'Nguyễn Thành',
      password: '123456',
    });
    expect(result.first_name).toEqual('Nam');
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();
    expect(result[0].first_name).toEqual('Nam');
  });

  it('show method should return the correct user', async () => {
    const result = await store.show('1');
    expect(result.first_name).toEqual('Nam');
  });

  it('should authenticate a user', async () => {
    const result = await store.authenticate('Nam', 'Nguyễn Thành', '123456');
    expect(result).not.toBeNull();
  });
});
