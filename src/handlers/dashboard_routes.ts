import express, { Request, Response } from 'express';
import { DashboardQueries } from '../services/dashboard';
import verifyAuthToken from '../midleware/verify_auth_token';

const dashboardRoutes = (app: express.Application) => {
  app.get('/current-order-by-user', verifyAuthToken, currentOrderByUser);
  app.get('/complete-order-by-user', completeOrderByUser);
  app.get('/products-by-category', productsByCategory);
};

const dashboard = new DashboardQueries();

const currentOrderByUser = async (req: Request, res: Response) => {
  try {
    const order = await dashboard.currentOrderByUser(req.body.userId);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const completeOrderByUser = async (req: Request, res: Response) => {
  try {
    const order = await dashboard.completeOrderByUser(req.body.userId);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const productsByCategory = async (req: Request, res: Response) => {
  try {
    const products = await dashboard.productsByCategory(req.body.category);
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export default dashboardRoutes;
