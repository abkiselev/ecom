import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
  },
  link: {
    type: String,
    required: true,
  },
},
{ timestamps: true });

// export default mongoose.model('category', categorySchema);
export default mongoose.models.category || mongoose.model('category', categorySchema);
