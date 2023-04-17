import request from 'supertest';
import app from '../../server';

describe('Product routes', () => {
  it('creates a new product', async () => {
    const user = {
      first_name: 'Nam',
      last_name: 'Nguyễn Thành',
      password: '123456',
    };
    const responseToken = await request(app)
      .post('/users/authenticate')
      .send(user);
    const token = responseToken.body;
    const product = {
      name: 'ipad air 4',
      price: 600,
      category: 'Đồ điện tử',
    };
    const response = await request(app)
      .post('/products')
      .send(product)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('get list products', async () => {
    const response = await request(app).get('/products');
    expect(response.status).toBe(200);
  });

  it('get a correct product', async () => {
    const response = await request(app).get('/products/1');
    expect(response.status).toBe(200);
  });
});
