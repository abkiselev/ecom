// import dbConnect from '../../../lib/mongodb'
// import Lookbook from '../models/lookbook';
import { OK_CODE, DEFAULT_CODE } from '../constants/errors';

export const getImages = async (req, res) => {
  await dbConnect()
  res.status(OK_CODE).send({ data: 'запрос ОК' })
  // Lookbook.find({})
  //   .then((images) => res.status(OK_CODE).send({ data: images }))
  //   .catch(() => res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка' }));
};

export const createCard = (req, res) => {
  res.status(DEFAULT_CODE).send({ data: req.body })
  console.log(req.body)

  // const { link, category } = req.body;

  // await dbConnect()

  // try {
  //   const card = await Lookbook.create({ link, category });
  //   return res.status(CREATED_CODE).send({ data: card });
  // } catch (error) {
  //   if (error.name === 'ValidationError') {
  //     return res.status(BAD_REQUEST_CODE).send({ message: 'Некорректные данные для создания карточки' });
  //   }
  //   return res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка' });
  // }
};