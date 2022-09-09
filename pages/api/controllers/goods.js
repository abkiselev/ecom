import dbConnect from '../../../utils/mongodb'
import Category from '../models/category.js';
import Good from '../models/good.js';
import { OK_CODE, CREATED_CODE, BAD_REQUEST_CODE, NOT_FOUND_CODE, DEFAULT_CODE } from '../constants/errors';

export const getGoods = async (req, res) => {
  await dbConnect()

  Category.find();

  Good.find({})
    .populate('category')
    .then((goods) => res.status(OK_CODE).send({ data: goods }))
    .catch((error) => res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка', error: error.message }));
};

export const createGood = async (req, res) => {
  await dbConnect()

  try {
    const good = await Good.create(req.body);
    return res.status(CREATED_CODE).send({ data: good.populate('category') });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(BAD_REQUEST_CODE).send({ message: 'Некорректные данные для создания карточки', ...error });
    }
    return res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка' });
  }
};

export const updateGood = async (req, res) => {
  await dbConnect()

  try {
    const good = await Good.findByIdAndUpdate(
      req.query.id,
      req.body,
      // { new: true, runValidators: true },
    );
    // console.log(good)
    if (!good) {
      return res.status(NOT_FOUND_CODE).send({ message: 'Указанный _id не найден' });
    }
    return res.status(OK_CODE).send({ data: good.populate('category') });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(BAD_REQUEST_CODE).send({ message: 'Неверный формат ID' });
    }
    if (error.name === 'ValidationError') {
      return res.status(BAD_REQUEST_CODE).send({ message: 'Некорректные данные для обновления' });
    }
    return res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка', error: error.message });
  }
};

module.exports.deleteGood = async (req, res) => {
  await dbConnect()

  try {
    const good = await Good.findByIdAndRemove(req.query.id);

    if (!good) {
      return res.status(NOT_FOUND_CODE).send({ message: 'Указанный _id не найден' });
    }
    return res.status(OK_CODE).send({ data: good });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(BAD_REQUEST_CODE).send({ message: 'Неверный формат ID' });
    }
    return res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка' });
  }
};