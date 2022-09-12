import dbConnect from '../../../utils/mongodb';
import User from '../models/user';

export const checkUserExist = async (email) => {
  console.log('checkUserExist', email)
  try {
    // const { email } = req.body;
    const user = await User.findOne(email);

    console.log('checkUserExist возврат айди', user._id)
      
    return user._id
  } catch (e) {
    return false
  }
}

