import mongoose from 'mongoose';
import env from './env';

mongoose.Promise = Promise;
const mongoUrl = env.db.url;

const connect = () => mongoose.connect(mongoUrl, { useMongoClient: true });
export default{ connect };
