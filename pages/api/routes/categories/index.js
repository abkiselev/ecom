import { getCategories, createCategory } from '../../controllers/categories';

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
        getCategories(req, res)
        break;
    case 'POST':
        createCategory(req, res)
        break;
    default:
        res.status(405).json({ error: `Недопустимый метод` });
        break;
  }
}