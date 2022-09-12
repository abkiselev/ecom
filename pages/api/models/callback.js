import mongoose from 'mongoose';
import { telRegexp, emailRegexp } from '../../../utils/regexp';

const callbackSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return emailRegexp.test(v);
      },
      message: (props) => `${props.value} - не верный формат`,
    },
  },
  tel: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return telRegexp.test(v);
      },
      message: (props) => `${props.value} - не верный формат`,
    },
  },
},
{ timestamps: true });

// export default mongoose.model('user', userSchema);
export default mongoose.models.callback || mongoose.model('callback', callbackSchema);
