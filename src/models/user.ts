import Client from '../database';
import bcrypt from 'bcrypt';

export type User = {
  id?: string | number;
  first_name: string;
  last_name: string;
  password: string;
};

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users;';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get users ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1);';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const sql =
        'INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *;';
      const conn = await Client.connect();

      const hash = bcrypt.hashSync(
        u.password + pepper,
        parseInt(saltRounds as string)
      );

      const result = await conn.query(sql, [u.first_name, u.last_name, hash]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(
        `Could not add new user ${u.first_name} ${u.last_name}. Error: ${err}`
      );
    }
  }

  async authenticate(
    first_name: string,
    last_name: string,
    password: string
  ): Promise<User | null> {
    const conn = await Client.connect();
    const sql =
      'SELECT password FROM users WHERE first_name = $1 AND last_name = $2;';
    const result = await conn.query(sql, [first_name, last_name]);
    console.log(password + pepper);
    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(password + pepper, user.password)) {
        return user;
      }
    }
    
    return null;
  }
}
