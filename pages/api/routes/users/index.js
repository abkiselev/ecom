import { getUsers, createUser } from '../../controllers/users';

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
        getUsers(req, res)
        break;
    case 'POST':
        createUser(req, res)
        break;
    default:
        res.status(405).json({ error: `Недопустимый метод` });
        break;
  }
}