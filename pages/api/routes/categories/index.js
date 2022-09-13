import { getCategories, createCategory } from '../../controllers/categories';
import { checkAuth } from '../../middlewares/checkAuth';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
        getCategories(req, res)
        break;
    case 'POST':
        const user = await checkAuth(req, res);
        if (!user || user.role !== 'admin') {
          return res.status(403).json({ error: `Нет прав` });
        } else {
          createCategory(req, res)
        }
        // createCategory(req, res)
        break;
    default:
        res.status(405).json({ error: `Недопустимый метод` });
        break;
  }
}