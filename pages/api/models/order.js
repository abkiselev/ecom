import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  goods: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'good' }],
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user',
    required: true,
  },
  oplata: {
    type: String,
    required: true,
  },
  dostavka: {
    type: String,
    required: true,
  },
},
{ timestamps: true });

// export default mongoose.model('order', orderSchema);
export default mongoose.models.order || mongoose.model('order', orderSchema);
