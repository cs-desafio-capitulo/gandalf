import mongoose from 'mongoose';

// define o schema user
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  permission: { type: String, enum: ['admin', 'user'], default: 'user' },
  criate_date: { type: Date },
  update_date: { type: Date, default: Date.now },
  last_login: { type: Date, default: Date.now },
  token: String,
});
module.exports = mongoose.model('User', userSchema);
