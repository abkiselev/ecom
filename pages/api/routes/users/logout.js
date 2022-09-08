import { logout } from '../../controllers/users';

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
        logout(req, res)
        break;
    default:
        res.status(405).json({ error: `Недопустимый метод` });
        break;
  }
}