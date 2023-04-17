import request from 'supertest';
import app from '../../server';

describe('Users routes', () => {
  it('creates a new user', async () => {
    const user = {
      first_name: 'Nam',
      last_name: 'Nguyễn Thành',
      password: '123456',
    };
    const response = await request(app).post('/users').send(user);
    expect(response.status).toBe(200);
  });

  it('authenticate user', async () => {
    const user = {
      first_name: 'Nam',
      last_name: 'Nguyễn Thành',
      password: '123456',
    };
    const response = await request(app).post('/users/authenticate').send(user);
    expect(response.status).toBe(200);
  });

  it('get list user', async () => {
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
      .get('/users')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('get a correct user', async () => {
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
      .get('/users/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
