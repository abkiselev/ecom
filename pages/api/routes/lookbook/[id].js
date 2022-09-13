import { deleteImage } from '../../controllers/lookbook';
import { checkAuth } from '../../middlewares/checkAuth';

export default async function handler(req, res) {
  switch (req.method) {
    case 'DELETE':
        const user = await checkAuth(req, res);
        if (!user || user.role !== 'admin') {
          return res.status(403).json({ error: `Нет прав` });
        } else {
          deleteImage(req, res)
        }
        // deleteImage(req, res)
        break;
    default:
        res.status(405).json({ error: `Недопустимый метод` });
        break;
  }
}