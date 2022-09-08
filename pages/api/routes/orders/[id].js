import { getUserOrders } from '../../controllers/orders';

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
        getUserOrders(req, res)
        break;
    default:
        res.status(405).json({ error: `Недопустимый метод` });
        break;
  }
}