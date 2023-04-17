import express, { Request, Response } from 'express';
import { OrderProductStore } from '../models/order_product';

const store = new OrderProductStore();

const addProduct = async (req: Request, res: Response) => {
  const orderId: string = req.params.id;
  const productId: string = req.body.productId;
  const quantity: number = parseInt(req.body.quantity);
  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const index = async (_req: Request, res: Response) => {
  const orderProducts = await store.index();
  res.json(orderProducts);
};

const show = async (req: Request, res: Response) => {
  const orderProduct = await store.show(req.params.id);
  res.json(orderProduct);
};

const orderProductRoutes = (app: express.Application) => {
  app.post('/orders/:id/products', addProduct);
  app.get('/order-products', index);
  app.get('/order-products/:id', show);
};

export default orderProductRoutes;
