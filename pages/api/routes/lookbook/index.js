import { getImages, createImages, deleteImage } from '../../controllers/lookbook';

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
        getImages(req, res)
        break;
    case 'POST':
        createImages(req, res)
        break;
    // case 'DELETE':
    //     deleteImage(req, res)
    //     break;
    default:
        res.status(405).json({ error: `Недопустимый метод` });
        break;
  }
}