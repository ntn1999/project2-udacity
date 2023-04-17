import Client from '../database';

export type OrderProduct = {
  id?: string | number;
  quantity: number;
  order_id: string;
  product_id: string;
};

export class OrderProductStore {
  async addProduct(
    quantity: number,
    order_id: string,
    product_id: string
  ): Promise<OrderProduct> {
    try {
      const ordersql = 'SELECT * FROM orders WHERE id=($1)';
      const conn = await Client.connect();
      const result = await conn.query(ordersql, [order_id]);
      const order = result.rows[0];
      if (order.status !== 'active') {
        throw new Error(
          `Could not add product ${product_id} to order ${order_id} because order status is ${order.status}`
        );
      }
      conn.release();
    } catch (err) {
      throw new Error(`${err}`);
    }

    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *;';
      const conn = await Client.connect();
      const result = await conn.query(sql, [quantity, order_id, product_id]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${product_id} to order ${order_id}: ${err}`
      );
    }
  }

  async index(): Promise<OrderProduct[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM order_products;';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get order_products ${err}`);
    }
  }

  async show(id: string): Promise<OrderProduct> {
    try {
      const sql = 'SELECT * FROM order_products WHERE id=($1);';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order_product ${id}. Error: ${err}`);
    }
  }
}
