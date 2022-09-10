import { getUser, updateUser } from '../../../controllers/users';

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
        getUser(req, res)
        break;
    case 'POST':
        updateUser(req, res)
        break;
    default:
        res.status(405).json({ error: `Недопустимый метод` });
        break;
  }
}