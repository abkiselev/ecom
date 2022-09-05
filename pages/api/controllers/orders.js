import dbConnect from '../../../lib/mongodb';
import Order from '../models/order.js';
import { OK_CODE, CREATED_CODE, BAD_REQUEST_CODE, NOT_FOUND_CODE, DEFAULT_CODE } from '../constants/errors';


export const getOrders = async (req, res) => {
  await dbConnect()

  Order.find({})
    .populate('category')
    .then((orders) => res.status(OK_CODE).send({ data: orders }))
    .catch((error) => res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка', error: error.message }));
};

export const createOrder = async (req, res) => {
  const { goods, total, owner, oplata, dostavka } = req.body;
  
  console.log(req.body)
  await dbConnect()

  try {
    const order = await Order.create({ goods, total, owner, oplata, dostavka });
    return res.status(CREATED_CODE).send({ data: order });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(BAD_REQUEST_CODE).send({ message: 'Некорректные данные для создания карточки', error: error.message });
    }
    return res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка' });
  }
};