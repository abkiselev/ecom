import dbConnect from '../../../lib/mongodb'
import Good from '../models/good.js';
import { OK_CODE, CREATED_CODE, BAD_REQUEST_CODE, NOT_FOUND_CODE, DEFAULT_CODE } from '../constants/errors';

export const getGoods = async (req, res) => {
  await dbConnect()

  Good.find({})
    .populate('category')
    .then((goods) => res.status(OK_CODE).send({ data: goods }))
    .catch((error) => res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка', error: error.message }));
};

export const createGood = async (req, res) => {
  console.log(req.body)
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

module.exports.deleteGood = async (req, res) => {
  await dbConnect()

  try {
    const good = await Good.findByIdAndRemove(req.query.id);

    if (!good) {
      return res.status(NOT_FOUND_CODE).send({ message: 'Карточка с указанным _id не найдена' });
    }
    return res.status(OK_CODE).send({ data: good });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(BAD_REQUEST_CODE).send({ message: 'Неверный формат ID карточки' });
    }
    return res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка' });
  }
};