import { updateGood, deleteGood } from '../../controllers/goods';

export default function handler(req, res) {
  switch (req.method) {
    case 'PATCH':
        updateGood(req, res)
        break;
    case 'DELETE':
        deleteGood(req, res)
        break;
    default:
        res.status(405).json({ error: `Недопустимый метод` });
        break;
  }
}