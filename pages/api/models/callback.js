import mongoose from 'mongoose';

const callbackSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
},
{ timestamps: true });

// export default mongoose.model('user', userSchema);
export default mongoose.models.callback || mongoose.model('callback', callbackSchema);
