import mongoose from 'mongoose';
import { namesRegexp, telRegexp, passwordRegexp, emailRegexp } from '../../../utils/regexp';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    validate: {
      validator(v) {
        return namesRegexp.test(v);
      },
      message: (props) => `${props.value} - не верный формат`,
    },
  },
  secondName: {
    type: String,
    validate: {
      validator(v) {
        return namesRegexp.test(v);
      },
      message: (props) => `${props.value} - не верный формат`,
    },
  },
  surName: {
    type: String,
    validate: {
      validator(v) {
        return namesRegexp.test(v);
      },
      message: (props) => `${props.value} - не верный формат`,
    },
  },
  email: {
    type: String,
    required: true,
    unique : true,
    validate: {
      validator(v) {
        return emailRegexp.test(v);
      },
      message: (props) => `${props.value} - не верный формат`,
    },
  },
  tel: {
    type: String,
    unique : true,
    validate: {
      validator(v) {
        return telRegexp.test(v);
      },
      message: (props) => `${props.value} - не верный формат`,
    },
  },
  address: {
    type: String,
  },
  password: {
    type: String,
    validate: {
      validator(v) {
        return passwordRegexp.test(v);
      },
      message: (props) => `${props.value} - не верный формат`,
    },
  },
  cart: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'good' }],
    default: [],
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'good' }],
    default: [],
  },
  role: {
    type: String,
    default: 'user',
  },
},
{ timestamps: true });

// export default mongoose.model('user', userSchema);
export default mongoose.models.user || mongoose.model('user', userSchema);
