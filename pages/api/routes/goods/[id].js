import { updateGood, deleteGood } from '../../controllers/goods';
import { checkAuth } from '../../middlewares/checkAuth';

export default async function handler(req, res) {
  switch (req.method) {
    case 'PATCH':      
        let user = await checkAuth(req, res);
        if (!user || user.role !== 'admin') {
          return res.status(403).json({ error: `Нет прав` });
        } else {
          updateGood(req, res)
        }
        // updateGood(req, res)
        break;
    case 'DELETE':      
        user = await checkAuth(req, res);
        if (!user || user.role !== 'admin') {
          return res.status(403).json({ error: `Нет прав` });
        } else {
          deleteGood(req, res)
        }
        // deleteGood(req, res)
        break;
    default:
        res.status(405).json({ error: `Недопустимый метод` });
        break;
  }
}