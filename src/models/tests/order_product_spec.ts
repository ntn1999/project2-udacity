import { OrderStore } from '../order';
import { OrderProductStore } from '../order_product';
import { ProductStore } from '../products';
import { UserStore } from '../user';

const store = new OrderProductStore();
const userStore = new UserStore();
const productStore = new ProductStore();
const orderStore = new OrderStore();

describe('OrderProduct Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a addProduct method', () => {
    expect(store.addProduct).toBeDefined();
  });

  it('create method should add a order_product', async () => {
    await userStore.create({
      first_name: 'Nam',
      last_name: 'Nguyễn Thành',
      password: '123456',
    });
    await productStore.create({
      name: 'ipad air 4',
      price: 600,
      category: 'Đồ điện tử',
    });
    await orderStore.create({
      status: 'active',
      user_id: '1',
    });
    const result = await store.addProduct(2, '1', '1');
    expect(result).toEqual({
      id: 2,
      quantity: 2,
      order_id: '1',
      product_id: '1',
    });
  });

  it('index method should return a list of order_products', async () => {
    const result = await store.index();
    expect(result[1]).toEqual({
      id: 2,
      quantity: 2,
      order_id: '1',
      product_id: '1',
    });
  });

  it('show method should return the correct product', async () => {
    const result = await store.show('1');
    expect(result).toEqual({
      id: 1,
      quantity: 2,
      order_id: '1',
      product_id: '1',
    });
  });
});
