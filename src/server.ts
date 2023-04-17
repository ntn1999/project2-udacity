import { Request, Response } from 'express';
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './handlers/user_routes';
import orderRoutes from './handlers/order_routes';
import productRoutes from './handlers/product_routes';
import dashboardRoutes from './handlers/dashboard_routes';
import orderProductRoutes from './handlers/order_product_routes';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});
userRoutes(app);
orderRoutes(app);
productRoutes(app);
dashboardRoutes(app);
orderProductRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
