import { OrderStore } from '../../models/order';
import { ProductStore } from '../../models/products';
import { UserStore } from '../../models/user';
import { DashboardQueries } from '../dashboard';

const store = new DashboardQueries();
const storeProduct = new ProductStore();
const storeOrder = new OrderStore();
const storeUser = new UserStore();

describe('Dashboard Queries', () => {
  it('should have an currentOrderByUser method', () => {
    expect(store.currentOrderByUser).toBeDefined();
  });

  it('should have a completeOrderByUser method', () => {
    expect(store.completeOrderByUser).toBeDefined();
  });

  it('should have a productsByCategory method', () => {
    expect(store.productsByCategory).toBeDefined();
  });

  it('should call productsByCategory', async () => {
    await storeProduct.create({
      name: 'ipad air 4',
      price: 600,
      category: 'Đồ điện tử',
    });
    const result = await store.productsByCategory('Đồ điện tử');
    expect(result[0].category).toEqual('Đồ điện tử');
  });

  it('should call currentOrderByUser', async () => {
    await storeUser.create({
      first_name: 'Nam',
      last_name: 'Nguyễn Thành',
      password: '123456pk',
    });
    const order = await storeOrder.create({
      status: 'active',
      user_id: '1',
    });
    const result = await store.currentOrderByUser('1');
    expect(result).toEqual({ id: 5, status: 'active', user_id: '1' });
  });

  it('should call currentOrderByUser', async () => {
    await storeUser.create({
      first_name: 'Nam',
      last_name: 'Nguyễn Thành',
      password: '123456pk',
    });
    const order = await storeOrder.create({
      status: 'complete',
      user_id: '1',
    });
    const result = await store.completeOrderByUser('1');
    expect(result).toEqual([ { id: 6, status: 'complete', user_id: '1' } ]);
  });
});
