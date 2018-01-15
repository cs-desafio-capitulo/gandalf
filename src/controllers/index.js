import SHA256 from 'crypto-js/sha256';
import jwt from 'jsonwebtoken';
import User from '../models';

export const UserController = (UserModel, hash, tokconstrutor) => ({

  async create(req, res) {
    const user = new UserModel(req.body);
    try { 
      user.password = hash(user.password); 
      await user.save();
      res.status(200).send(user);
    } catch (err) {
      res.status(400).send(err.message);
    }
  },

  async signin(req, res) {
    let pass = req.body.password;
    pass = hash(pass).toString();
    const expirationDate = new Date()+30*60000;
     
    try { 
      const user = await UserModel.findOne({ email: req.body.email, password: pass });
      user.exp = expirationDate;
      const token = tokconstrutor.sign(user.toJSON(), 'codigo');
      res.status(200).send(token);
    } catch (err) {
      res.status(400).send(err.message);
    } ;
  },

  async validate(req,res) {

    try {
      const decoded = jwt.verify(
        req.body.token,'codigo',
        {
          algorithms: ['HS256'] }
      );
      console.log( { decoded } );
      const validTime = decoded.exp;
      res.status(200).send({ id: user.id, validate: validTime });

    } catch (err) {
      res.status(400).send(err.message);
    }
     
  }
});

export default UserController(User, SHA256, jwt);
