import { getImages, createCard } from '../controllers/lookbook';

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
        getImages(req, res)
        break;
    case 'POST':
        createCard(req, res)
        break;
    default:
        res.status(405).json({ error: `Недопустимый метод` });
        break;
  }
}