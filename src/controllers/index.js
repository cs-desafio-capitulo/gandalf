import sha256 from 'crypto-js/sha256';
import jwt from 'jsonwebtoken';
import User from '../models';

const UserController = UserModel => ({
  async create(req, res) {
    const user = new UserModel(req.body);
    try {
      user.password = sha256(user.password);
      await user.save();
      res.status(200).send(user);
    } catch (err) {
      res.status(400).send(err.message);
    }
  },

  async signin(req, res) {
    try {
      const password = sha256(req.body.password);
      const user = await User.findOne({ email: req.body.email, password: password.toString() });
      const token = jwt.sign(user.toJSON(), 'codigo');
      res.status(200).send(token);
    } catch (err) {
      res.status(400).send(err.message);
    }
  },
});

export default UserController(User);
