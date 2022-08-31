import dbConnect from '../../../lib/mongodb'
import Category from '../models/categories.js';
import { OK_CODE, CREATED_CODE, BAD_REQUEST_CODE, NOT_FOUND_CODE, DEFAULT_CODE } from '../constants/errors';

export const getCategories = async (req, res) => {
  await dbConnect()

  Category.find({})
    .then((cats) => res.status(OK_CODE).send({ data: cats }))
    .catch(() => res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка' }));
};

export const getCategory = async (req, res) => {
  await dbConnect()

  Category.find({})
    .then((cat) => res.status(OK_CODE).send({ data: cat }))
    .catch(() => res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка' }));
};

export const createCategory = async (req, res) => {
  await dbConnect()

  try {
    const cat = await Category.create(req.body);
    return res.status(CREATED_CODE).send({ data: cat });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(BAD_REQUEST_CODE).send({ message: 'Некорректные данные для создания карточки' });
    }
    return res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports.deleteCategory = async (req, res) => {
  await dbConnect()

  try {
    const cat = await Category.findByIdAndRemove(req.query.id);

    if (!cat) {
      return res.status(NOT_FOUND_CODE).send({ message: 'Карточка с указанным _id не найдена' });
    }
    return res.status(OK_CODE).send({ data: cat });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(BAD_REQUEST_CODE).send({ message: 'Неверный формат ID карточки' });
    }
    return res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка' });
  }
};