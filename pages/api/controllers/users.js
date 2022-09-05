import dbConnect from '../../../lib/mongodb';
import User from '../models/user.js';
import { OK_CODE, CREATED_CODE, BAD_REQUEST_CODE, NOT_FOUND_CODE, DEFAULT_CODE } from '../constants/errors';


module.exports.getUsers = async (req, res) => {
  await dbConnect()

  User.find({})
    .then((users) => res.status(OK_CODE).send({ data: users }))
    .catch(() => res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.getUser = async (req, res) => {
  await dbConnect()

  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(NOT_FOUND_CODE).send({ message: 'Пользователь по указанному _id не найден' });
    }
    return res.status(OK_CODE).send({ data: user });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(BAD_REQUEST_CODE).send({ message: 'Неверный формат ID пользователя' });
    }
    return res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports.createUser = async (req, res) => {
  const { firstName, secondName, surName, email, tel, address } = req.body;
  console.log(firstName, secondName, surName, email, tel, address)

  await dbConnect()

  try {
    const user = await User.create({ firstName, secondName, surName, email, tel, address });
    return res.status(CREATED_CODE).send({ data: user });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(BAD_REQUEST_CODE).send({ message: 'Некорректные данные для создания пользователя' });
    }
    return res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка' });
  }
};

// module.exports.updateUser = async (req, res) => {
//   const { name, about } = req.body;

//   try {
//     const user = await User.findByIdAndUpdate(
//       req.user._id,
//       { name, about },
//       { new: true, runValidators: true },
//     );

//     if (!user) {
//       return res.status(NOT_FOUND_CODE).send({ message: 'Пользователь по указанному _id не найден' });
//     }
//     return res.status(OK_CODE).send({ data: user });
//   } catch (error) {
//     if (error.kind === 'ObjectId') {
//       return res.status(BAD_REQUEST_CODE).send({ message: 'Неверный формат ID пользователя' });
//     }
//     if (error.name === 'ValidationError') {
//       return res.status(BAD_REQUEST_CODE).send({ message: 'Некорректные данные для обновления пользователя' });
//     }
//     return res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка' });
//   }
// };