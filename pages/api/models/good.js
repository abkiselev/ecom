import mongoose from 'mongoose';

const goodSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
  },
  link: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: true,
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    default: [],
  },
  price: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  images: {
    type: [ String ],
    required: true,
  },
},
{ timestamps: true });

// export default mongoose.model('good', goodSchema);
export default mongoose.models.good || mongoose.model('good', goodSchema);
