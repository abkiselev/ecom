import { getCategory, deleteCategory } from '../../controllers/categories';

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      getCategory(req, res)
        break;
    case 'DELETE':
        deleteCategory(req, res)
        break;
    default:
        res.status(405).json({ error: `Недопустимый метод` });
        break;
  }
}