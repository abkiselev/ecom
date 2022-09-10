import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    // required: true,
  },
  secondName: {
    type: String,
    // required: true,
  },
  surName: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    required: true,
    unique : true,
  },
  tel: {
    type: String,
    // required: true,
  },
  address: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    // select: false,
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
