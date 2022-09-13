import { login } from '../../controllers/users';

export default function handler(req, res) {
  switch (req.method) {
    case 'POST':
        login(req, res)
        break;
    default:
        res.status(405).json({ error: `Недопустимый метод` });
        break;
  }
}