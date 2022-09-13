import { register } from '../../controllers/users';

export default function handler(req, res) {
  switch (req.method) {
    case 'POST':
        register(req, res)
        break;
    default:
        res.status(405).json({ error: `Недопустимый метод` });
        break;
  }
}