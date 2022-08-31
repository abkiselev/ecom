import { deleteImage } from '../../controllers/lookbook';

export default function handler(req, res) {
  switch (req.method) {
    case 'DELETE':
        deleteImage(req, res)
        break;
    default:
        res.status(405).json({ error: `Недопустимый метод` });
        break;
  }
}