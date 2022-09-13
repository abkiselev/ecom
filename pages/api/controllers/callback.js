import dbConnect from '../../../utils/mongodb';
import Callback from '../models/callback.js';
import { CREATED_CODE, BAD_REQUEST_CODE, DEFAULT_CODE } from '../constants/errors';

module.exports.createCallback = async (req, res) => {
  const { email, tel } = req.body;

  try {  
    const userData = await Callback.create({ email, tel });
    return res.status(CREATED_CODE).send({ data: { userData } });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(BAD_REQUEST_CODE).send({ message: 'Некорректные данные' });
    }
    return res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка', err: error.message });
  }
};