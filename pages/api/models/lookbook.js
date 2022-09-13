import mongoose from 'mongoose';

const lookbookSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
},
{ timestamps: true });

// export default mongoose.model('lookbook', lookbookSchema);
export default mongoose.models.lookbook || mongoose.model('lookbook', lookbookSchema);