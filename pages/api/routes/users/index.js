import { getUsers, createUser } from '../../controllers/users';
import { checkAuth } from '../../middlewares/checkAuth';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
        const user = await checkAuth(req, res);
        if (!user || user.role !== 'admin') {
          return res.status(403).json({ error: `Нет прав` });
        } else {
          getUsers(req, res)
        }
        break;
    case 'POST':
        createUser(req, res)
        break;
    default:
        res.status(405).json({ error: `Недопустимый метод` });
        break;
  }
}