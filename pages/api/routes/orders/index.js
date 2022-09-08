import { getOrders, createOrder } from '../../controllers/orders';

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
        getOrders(req, res)
        break;
    case 'POST':
        createOrder(req, res)
        break;
    default:
        res.status(405).json({ error: `Недопустимый метод` });
        break;
  }
}