import mongoose from 'mongoose';

const goodSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    unique : true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  visota: {
    type: Number,
    required: true,
  },
  shirina: {
    type: Number,
    required: true,
  },
  glubina: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
  },
  images: {
    type: [ String ],
    required: true,
  },
},
{ timestamps: true });

// export default mongoose.model('good', goodSchema);
export default mongoose.models.good || mongoose.model('good', goodSchema);
