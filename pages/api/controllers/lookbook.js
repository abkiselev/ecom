import Lookbook from '../models/lookbook';
import { OK_CODE, DEFAULT_CODE } from '../constants/errors';

export const getImages = (req, res) => {
  res.status(OK_CODE).send({ data: 'запрос ОК' })
  // Lookbook.find({})
  //   .then((images) => res.status(OK_CODE).send({ data: images }))
  //   .catch(() => res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка' }));
};

export const createCard = async (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  try {
    const card = await Card.create({ name, link, owner });
    return res.status(CREATED_CODE).send({ data: card });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(BAD_REQUEST_CODE).send({ message: 'Некорректные данные для создания карточки' });
    }
    return res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка' });
  }
};