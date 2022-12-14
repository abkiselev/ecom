import dbConnect from '../../../utils/mongodb';
import Cookies from 'cookies'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Good from '../models/good.js';
import { OK_CODE, CREATED_CODE, BAD_REQUEST_CODE, NOT_FOUND_CODE, DEFAULT_CODE, CONFLICT_ERROR_CODE } from '../constants/errors';


module.exports.getUsers = async (req, res) => {
  await dbConnect()

  User.find({}).select('-password -role -address -createdAt -updatedAt -__v')
    .then((users) => res.status(OK_CODE).send({ data: users }))
    .catch(() => res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка' }));
};


module.exports.getUser = async (req, res) => {
  await dbConnect()

  try {
    const user = await User.findById(req.query.id).select('-password -role -address -createdAt -updatedAt -__v');

    if (!user) {
      return res.status(NOT_FOUND_CODE).send({ message: 'Пользователь по указанному _id не найден' });
    }
    return res.status(OK_CODE).send({ data: user });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(BAD_REQUEST_CODE).send({ message: 'Неверный формат ID пользователя' });
    }
    return res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка', err: error.message });
  }
};

module.exports.createUser = async (req, res) => {
  await dbConnect()
  try {
    const { firstName, secondName, surName, email, tel, address, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
  
    const user = await User.create({ firstName, secondName, surName, email, tel, address, password: hash });
    return res.status(CREATED_CODE).send({ 
      data: { _id: user._id, firstName: user.firstName, secondName: user.secondName, surName: user.surName, email: user.email, tel: user.tel, address: address.tel } 
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(BAD_REQUEST_CODE).send({ message: 'Некорректные данные для создания пользователя' });
    }
    if (error.code === 11000) {
      return res.status(CONFLICT_ERROR_CODE).send({ message: 'Пользователь с таким E-mail или телефоном уже есть. Пожалуйста, войдите в личный кабинет', err: error.message });
    }
    return res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка', err: error.message });
  }
};

module.exports.register = async (req, res) => {
  await dbConnect()
  try {
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
  
    const user = await User.create({ email, password: hash });
    return res.status(CREATED_CODE).send({ 
      data: { _id: user._id, email: user.email } 
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(BAD_REQUEST_CODE).send({ message: 'Некорректные данные для создания пользователя', err: error.message });
    }
    if (error.code === 11000) {
      return res.status(CONFLICT_ERROR_CODE).send({ message: 'Пользователь с таким E-mail или телефоном уже есть', err: error.message });
    }
    return res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка', err: error.message });
  }
};

module.exports.login = async (req, res) => {
  await dbConnect()
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).send({ message: 'Неправильные почта или пароль' });
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return res.status(401).send({ message: 'Неправильные почта или пароль' });
    }

    const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
    const cookies = new Cookies(req, res);
    
    res.cookie = cookies.set('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true })
    return res.status(OK_CODE).send({ token });

  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(BAD_REQUEST_CODE).send({ message: 'Некорректные данные' });
    }
    return res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка', err: error.message });
  }
};

module.exports.updateUser = async (req, res) => {
  const { firstName, secondName, surName, address, tel, email } = req.body;
  await dbConnect()

  try {
    const token = req.cookies['jwt']
    const userId = jwt.verify(token, 'some-secret-key')._id;

    const user = await User.findByIdAndUpdate(
      userId,
      { firstName, secondName, surName, address, tel, email },
      { new: true, runValidators: true },
    )
    .select('-password -role -address -createdAt -updatedAt -__v')
    .populate('cart likes');

    if (!user) {
      return res.status(NOT_FOUND_CODE).send({ message: 'Пользователь по указанному _id не найден' });
    }
    return res.status(OK_CODE).send({ data: user });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(BAD_REQUEST_CODE).send({ message: 'Неверный формат ID пользователя' });
    }
    if (error.name === 'ValidationError') {
      return res.status(BAD_REQUEST_CODE).send({ message: 'Некорректные данные для обновления пользователя' });
    }
    return res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка', err: error.message });
  }
};

module.exports.logout = async (req, res) => {
  await dbConnect()
  try {
    const cookies = new Cookies(req, res);
    
    res.cookie = cookies.set('jwt')
    return res.send({ message: 'Выход' });    
  } catch (error) {
    return res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка', err: error.message });
  }
};


module.exports.setLikes = async (req, res) => {
  await dbConnect()
  try {
    const user = await User.findByIdAndUpdate(
      req.query.id,
      { $addToSet: req.body },
      { new: true },
    )
    .populate('likes');

    if (!user) {
      return res.status(NOT_FOUND_CODE).send({ message: 'Пользователь по указанному _id не найден' });
    }
    return res.send({ data: user.likes });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(BAD_REQUEST_CODE).send({ message: 'Неверный формат ID пользователя' });
    }
    return res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка', err: error.message });
  }
};

module.exports.deleteLikes = async (req, res) => {
  await dbConnect()
  try {
    const user = await User.findByIdAndUpdate(
      req.query.id,
      { $pullAll: req.body },
      { new: true },
    )
    .populate('likes');

    if (!user) {
      return res.status(NOT_FOUND_CODE).send({ message: 'Пользователь по указанному _id не найден', err: error.message });
    }
    return res.send({ data: user.likes });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(BAD_REQUEST_CODE).send({ message: 'Неверный формат ID пользователя' });
    }
    return res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка', err: error.message });
  }
};


module.exports.setCart = async (req, res) => {
  await dbConnect()
  try {
    const user = await User.findByIdAndUpdate(
      req.query.id,
      { $addToSet: req.body },
      { new: true },
    )
    .populate('cart');

    if (!user) {
      return res.status(NOT_FOUND_CODE).send({ message: 'Пользователь по указанному _id не найден' });
    }
    return res.send({ data: user.cart });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(BAD_REQUEST_CODE).send({ message: 'Неверный формат ID пользователя' });
    }
    return res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка', err: error.message });
  }
};

module.exports.deleteCart = async (req, res) => {
  await dbConnect()
  try {
    const user = await User.findByIdAndUpdate(
      req.query.id,
      { $pullAll: req.body },
      { new: true },
    )
    .populate('cart');

    if (!user) {
      return res.status(NOT_FOUND_CODE).send({ message: 'Пользователь по указанному _id не найден' });
    }
    return res.send({ data: user.cart });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(BAD_REQUEST_CODE).send({ message: 'Неверный формат ID пользователя' });
    }
    return res.status(DEFAULT_CODE).send({ message: 'На сервере произошла ошибка', err: error.message });
  }
};