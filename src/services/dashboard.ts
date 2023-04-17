import Client from "../database";
import { Order } from "../models/order";
import { Product } from "../models/products";

export class DashboardQueries {
  async currentOrderByUser(user_id: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql =
        "SELECT * FROM orders WHERE status = 'active' AND user_id = $1 ORDER BY id DESC LIMIT 1";
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`unable get current order by user: ${err}`);
    }
  }

  async completeOrderByUser(user_id: string): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql =
        "SELECT * FROM orders WHERE status = 'complete' AND user_id = $1";
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable get current order by user: ${err}`);
    }
  }

  async productsByCategory(category: string): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM products WHERE category = $1;";
      const result = await conn.query(sql, [category]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable get current order by user: ${err}`);
    }
  }
}
