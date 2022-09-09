import dbConnect from '../../../utils/mongodb'
import Lookbook from '../models/lookbook.js';
import { OK_CODE, CREATED_CODE, BAD_REQUEST_CODE, NOT_FOUND_CODE, DEFAULT_CODE } from '../constants/errors';

export const getImages = async (req, res) => {
  await dbConnect()

  Lookbook.find({})
    .then((images) => res.status(OK_CODE).send({ data: images }))
    .catch(() => res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка' }));
};

export const createImages = async (req, res) => {
  await dbConnect()

  try {
    const images = await Lookbook.insertMany(req.body);
    return res.status(CREATED_CODE).send({ data: images });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(BAD_REQUEST_CODE).send({ message: 'Некорректные данные для создания карточки' });
    }
    return res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports.deleteImage = async (req, res) => {
  await dbConnect()

  try {
    const image = await Lookbook.findByIdAndRemove(req.query.id);

    if (!image) {
      return res.status(NOT_FOUND_CODE).send({ message: 'Карточка с указанным _id не найдена' });
    }
    return res.status(OK_CODE).send({ data: image });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(BAD_REQUEST_CODE).send({ message: 'Неверный формат ID карточки' });
    }
    return res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка' });
  }
};