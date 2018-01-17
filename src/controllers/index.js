import SHA256 from 'crypto-js/sha256';
import jwt from 'jsonwebtoken';
import User from '../models';

export const calcExpDate = (exp) => {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + exp);
  return expirationDate;
};

function validateReqSignin(body, res) {
  if (typeof body.password !== 'undefined' && typeof body.email !== 'undefined') {
    return true;
  }
  const message = 'dados de entrada incorretos';
  res.status(400).send(message);
  return false;
}

function validateReqSignup(body, res) {
  if (typeof body.name !== 'undefined' && typeof body.password !== 'undefined' && typeof body.email !== 'undefined') {
    return true;
  }
  const message = 'dados de entrada incorretos';
  res.status(400).send(message);
  return false;
}

export const UserController = (UserModel, hash, tokconstrutor) => ({

  async create(req, res) {
    if (validateReqSignup(req.body, res)) {
      const user = new UserModel(req.body);
      try {
        user.password = hash(user.password);
        await user.save();
        res.status(200).send(user);
      } catch (err) {
        res.status(400).send(err.message);
      }
    }
  },
  async signin(req, res) {
    if (validateReqSignin(req.body, res)) {
      let pass = req.body.password;
      pass = hash(pass).toString();
      const exp = (30 * 60000);
      const expirationDate = calcExpDate(exp);
      try {
        const user = await UserModel.findOneAndUpdate({ email: req.body.email, password: pass }, { last_login: Date.now() });
        const myUser = user.toJSON();
        myUser.exp = exp;
        myUser.validDate = expirationDate;
        const token = tokconstrutor.sign(myUser, 'codigo');
        res.status(200).send(token);
      } catch (err) {
        res.status(400).send(err.message);
      }
    }
  },

  async validate(req, res) {
    try {
      const decoded = jwt.verify(
        req.body.token, 'codigo',
        {
          algorithms: ['HS256'],
        },
      );
      res.status(200).send(decoded);
    } catch (err) {
      res.status(400).send(err.message);
    }
  },
});

export default UserController(User, SHA256, jwt);
