import { createCallback } from '../../controllers/callback';

export default function handler(req, res) {
  switch (req.method) {
    case 'POST':
        createCallback(req, res)
        break;
    default:
        res.status(405).json({ error: `Недопустимый метод` });
        break;
  }
}