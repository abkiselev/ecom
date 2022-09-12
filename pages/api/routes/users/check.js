import { checkUser } from '../../controllers/users';

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
        checkUser(req, res)
        break;
    default:
        res.status(405).json({ error: `Недопустимый метод` });
        break;
  }
}