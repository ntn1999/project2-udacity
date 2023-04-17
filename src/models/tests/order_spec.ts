import { OrderStore } from '../order';
import { UserStore } from '../user';

describe('Order Model', () => {
  const store = new OrderStore();
  const userStore = new UserStore();

  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('create method should add a order', async () => {
    await userStore.create({
      first_name: 'Nam',
      last_name: 'Nguyễn Thành',
      password: '123456',
    });
    const result = await store.create({
      status: 'active',
      user_id: '1',
    });
    expect(result).toEqual({
      id: 4,
      status: 'active',
      user_id: '1',
    });
  });

  it('index method should return a list of orders', async () => {
    const result = await store.index();
    expect(result[0]).toEqual({
      id: 1,
      status: 'active',
      user_id: '1',
    });
  });

  it('show method should return the correct order', async () => {
    const result = await store.show('1');
    expect(result).toEqual({
      id: 1,
      status: 'active',
      user_id: '1',
    });
  });
});
