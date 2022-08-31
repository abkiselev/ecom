import { deleteGood } from '../../controllers/goods';

export default function handler(req, res) {
  switch (req.method) {
    case 'DELETE':
        deleteGood(req, res)
        break;
    default:
        res.status(405).json({ error: `Недопустимый метод` });
        break;
  }
}