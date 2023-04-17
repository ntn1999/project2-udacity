import express, { Response } from 'express';
import verifyAuthToken from '../verify_auth_token';
import request from 'supertest';
import app from '../../server';

describe('verifyAuthToken middleware', () => {
  let req: express.Request;
  let res: Response;
  let next: jasmine.Spy;

  beforeEach(() => {
    req = {} as express.Request;
    res = {
      status: jasmine.createSpy('status'),
      json: jasmine.createSpy('json'),
    } as unknown as Response;
    next = jasmine.createSpy('next');
  });

  it('should call next if a valid token is provided', async () => {
    const user = {
      first_name: 'Nam',
      last_name: 'Nguyễn Thành',
      password: '123456',
    };
    const responseToken = await request(app)
      .post('/users/authenticate')
      .send(user);
    const token = responseToken.body;
    req.headers = { authorization: `Bearer ${token}` };
    verifyAuthToken(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should send a 401 response', () => {
    req.headers = { authorization: 'Bearer invalidtoken' };
    verifyAuthToken(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith('Access denied, invalid token');
  });
});
