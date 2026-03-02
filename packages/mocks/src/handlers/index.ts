import { productHandlers } from './products';
import { orderHandlers } from './orders';
import { customerHandlers } from './customers';
import { collectionHandlers } from './collections';
import { authHandlers } from './auth';
import { dashboardHandlers } from './dashboard';

export const handlers = [
  ...productHandlers,
  ...orderHandlers,
  ...customerHandlers,
  ...collectionHandlers,
  ...authHandlers,
  ...dashboardHandlers,
];

export {
  productHandlers,
  orderHandlers,
  customerHandlers,
  collectionHandlers,
  authHandlers,
  dashboardHandlers,
};
