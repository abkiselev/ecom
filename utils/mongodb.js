import mongoose from 'mongoose';
console.log('mongodb', process.env.MONGODB_URI);
// console.log('mongodb', process.env);
const MONGODB_URI = "mongodb+srv://leton:Sy0sx1cN7GTadXUP@cluster0.ulbz8nl.mongodb.net/?retryWrites=true&w=majority";

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect