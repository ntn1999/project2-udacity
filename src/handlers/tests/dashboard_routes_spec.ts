import request from 'supertest';
import app from '../../server';

describe('Order_products routes', () => {
  it('get current-order-by-user success', async () => {
    const user = {
      first_name: 'Nam',
      last_name: 'Nguyễn Thành',
      password: '123456',
    };
    const responseToken = await request(app)
      .post('/users/authenticate')
      .send(user);
    const token = responseToken.body;
    const response = await request(app)
      .get('/current-order-by-user')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('get complete-order-by-user success', async () => {
    const response = await request(app).get('/complete-order-by-user');
    expect(response.status).toBe(200);
  });

  it('get products-by-category success', async () => {
    const response = await request(app).get('/products-by-category');
    expect(response.status).toBe(200);
  });
});
