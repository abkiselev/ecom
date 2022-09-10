import { setCart, deleteCart } from '../../../controllers/users';

export default function handler(req, res) {
  switch (req.method) {
      case 'PUT':
        setCart(req, res)
        break;
    case 'DELETE':
        deleteCart(req, res)
        break;
    default:
        res.status(405).json({ error: `Недопустимый метод` });
        break;
  }
}