import sha256 from 'crypto-js/sha256';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import User from '../models';

export const UserController = (UserModel, sha256, jwt) => ({

  async create(req, res) {
    const user = new UserModel(req.body);
    user.password = sha256(user.password);
    try {
      await user.save();
      res.status(200).send(user);
    } catch (err) {
      res.status(400).send(err.message);
    }
  },

  async signin(req, res) {
    const password = sha256(req.body.password);
    try {
      const user = await UserModel.findOne({ email: req.body.email, password: password.toString() });
      const token = jwt.sign(user.toJSON(), 'codigo');
      res.status(200).send(token);
    } catch (err) {
      res.status(400).send(err.message);
    }
  },
});

export default UserController(User, sha256, jwt);
