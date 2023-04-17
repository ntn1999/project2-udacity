import request from 'supertest';
import app from '../../server';

describe('Order_products routes', () => {
  it('creates a new order_products', async () => {
    const user = {
      first_name: 'Nam',
      last_name: 'Nguyễn Thành',
      password: '123456',
    };
    await request(app).post('/users').send(user);
    const order = {
      status: 'active',
      user_id: '1',
    };
    await request(app).post('/orders').send(order);
    const responseToken = await request(app)
      .post('/users/authenticate')
      .send(user);
    const token = responseToken.body;
    const product = {
      name: 'ipad air 4',
      price: 600,
      category: 'Đồ điện tử',
    };
    await request(app)
      .post('/products')
      .send(product)
      .set('Authorization', `Bearer ${token}`);
    const orderProduct = {
      productId: '1',
      quantity: 2,
    };
    const response = await request(app)
      .post('/orders/1/products')
      .send(orderProduct);
    expect(response.status).toBe(200);
  });

  it('get list orders_products', async () => {
    const response = await request(app).get('/order-products');
    expect(response.status).toBe(200);
  });

  it('get a correct order_products', async () => {
    const response = await request(app).get('/order-products/1');
    expect(response.status).toBe(200);
  });
});
