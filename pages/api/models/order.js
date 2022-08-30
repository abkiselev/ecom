import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  goods: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'good' }],
    default: [],
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  owner: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    default: [],
    required: true,
  },
  pay: {
    type: String,
    required: true,
  },
  delivery: {
    type: String,
    required: true,
  },
},
{ timestamps: true });

export default mongoose.model('order', orderSchema);
