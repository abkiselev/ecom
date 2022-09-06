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
    select: false,
  },
},
{ timestamps: true });

// export default mongoose.model('user', userSchema);
export default mongoose.models.user || mongoose.model('user', userSchema);
