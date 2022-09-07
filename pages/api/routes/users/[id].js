import { updateUser } from '../../controllers/users';

export default function handler(req, res) {
  switch (req.method) {
    case 'POST':
        updateUser(req, res)
        break;
    default:
        res.status(405).json({ error: `Недопустимый метод` });
        break;
  }
}