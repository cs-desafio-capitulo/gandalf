import mongoose from 'mongoose';

// define o schema user

const userSchema = mongoose.Schema({
  name: { type: String, required: [true, 'Path `name` is required.'] },
  email: { type: String, unique: [true, 'Path `email` need to be unique.'], required: [true, 'Path `email` is required.'] },
  password: { type: String, required: [true, 'Path `password` is required.'] },
  permission: { type: String, enum: ['admin', 'user'], default: 'user' },
  criate_date: { type: Date, default: Date.now },
  update_date: { type: Date, default: Date.now },
  last_login: { type: Date, default: Date.now },
});
export default mongoose.model('User', userSchema);
