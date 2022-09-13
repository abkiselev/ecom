import jwt from 'jsonwebtoken';
import dbConnect from '../../../utils/mongodb';
import User from '../models/user';

export const checkAuth = async (req) => {
    
    try {

    const token = req.cookies['jwt']
    const userId = jwt.verify(token, 'some-secret-key')._id;
    await dbConnect()

    const user = await User.findById(userId)
    .select('-password -address -createdAt -updatedAt -__v')
    .populate('cart likes')

    return user
  } catch (e) {
    return null
  }
}

