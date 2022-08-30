import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
  },
  secondName: {
    type: String,
    required: true,
    minlength: 2,
  },
  surName: {
    type: String,
    required: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    minlength: 2,
  },
  phone: {
    type: String,
    required: true,
    minlength: 8,
  },
},
{ timestamps: true });

export default mongoose.model('user', userSchema);
