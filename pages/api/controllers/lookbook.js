import dbConnect from '../../../lib/mongodb'
import Lookbook from '../models/lookbook.js';
import { OK_CODE, CREATED_CODE, DEFAULT_CODE } from '../constants/errors';

export const getImages = async (req, res) => {
  await dbConnect()

  Lookbook.find({})
    .then((images) => res.status(OK_CODE).send({ data: images }))
    .catch(() => res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка' }));
};

export const createImages = async (req, res) => {
  console.log('пришел запрос пост')
  console.log(req.body)

  await dbConnect()

  try {
    const images = await Lookbook.insertMany(req.body);
    return res.status(CREATED_CODE).send({ data: images });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(BAD_REQUEST_CODE).send({ message: 'Некорректные данные для создания карточки' });
    }
    return res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка', error: error.message });
  }
};