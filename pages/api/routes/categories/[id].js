import { deleteCategory } from '../../controllers/categories';

export default function handler(req, res) {
  switch (req.method) {
    case 'DELETE':
        deleteCategory(req, res)
        break;
    default:
        res.status(405).json({ error: `Недопустимый метод` });
        break;
  }
}