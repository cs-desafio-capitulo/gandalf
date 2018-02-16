import SHA256 from 'crypto-js/sha256';
import jwt from 'jsonwebtoken';
import User from '../models';

export const calcExpDate = (exp) => {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + exp);
  return expirationDate;
};
function validateSigin(body) {
  let message = '';
  if (!body.password) {
    message = 'password: Path `password` is required. ';
  }
  if (body.email === 'undefined') {
    message += 'email: Path `email` is required.';
  }
  return message;
}
export const UserController = (UserModel, hash, jsonwt) => ({

  async create(req, res) {
    try {
      const user = new UserModel(req.body);
      user.password = hash(user.password);
      await user.save();
      return res.status(200).send(await user);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  },

  async signin(req, res) {
    const message = validateSigin(req.body);
    if (message != '') {
      return res.status(400).send(message);
    }

    let pass = req.body.password;
    pass = hash(pass).toString();
    const exp = (300 * 60000);
    const expirationDate = calcExpDate(exp);
    try {
      const user = await UserModel
        .findOneAndUpdate({ email: req.body.email, password: pass }, { last_login: Date.now() });
      if (user == null) {
        return res.status(400).send('usuário não encontrado!');
      }
      const myUser = user.toJSON();
      const token = jsonwt.sign(myUser, 'codigo',{ expiresIn:exp});
      return res.status(200).send(token);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  },

  async validate(req, res) {
    try {
      const decoded = await jwt.verify(
        req.body.token, 'codigo',
        {
          algorithms: ['HS256'],
        },
      );
      return res.status(200).send(decoded);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  },
});

export default UserController(User, SHA256, jwt);
