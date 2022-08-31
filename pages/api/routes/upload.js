import { createRouter } from 'next-connect';
import multer from 'multer';


const upload = multer({
  storage: multer.diskStorage({
    destination: './public/images/uploads',
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const apiRoute = createRouter({
  onError(error, req, res) {
    res.status(501).json({ error: `Ошибка ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Нельзя использовать метод '${req.method}'` });
  },
});

apiRoute.use(upload.array('theFiles'));

apiRoute.post((req, res) => {
  // console.log(req)
  res.status(200).json({ data: 'Загружено' });
});

export default apiRoute.handler();

export const config = {
  api: {
    bodyParser: false,
  },
};

