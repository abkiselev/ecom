import { getGoods, createGood } from '../../controllers/goods';

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
        getGoods(req, res)
        break;
    case 'POST':
        createGood(req, res)
        break;
    default:
        res.status(405).json({ error: `Недопустимый метод` });
        break;
  }
}