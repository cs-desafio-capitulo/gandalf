import mongoose from 'mongoose';

mongoose.Promise = Promise;
const mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/test';

const connect = () => mongoose.connect(mongoUrl, { useMongoClient: true });
export default{ connect };
