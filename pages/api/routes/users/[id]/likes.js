import { setLikes, deleteLikes } from '../../../controllers/users';

export default function handler(req, res) {
  switch (req.method) {
      case 'PUT':
        setLikes(req, res)
        break;
    case 'DELETE':
        deleteLikes(req, res)
        break;
    default:
        res.status(405).json({ error: `Недопустимый метод` });
        break;
  }
}