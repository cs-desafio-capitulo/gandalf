import axios from 'axios';

export default async (req, res, next) => {
  try {
    if (!req.body.email) {
      req.body.email = 'undefined';
    }
    await axios.post('https://immense-brushlands-11219.herokuapp.com/log/', {
      user: ('usuario:', req.body.email),
      service: 'GANDALF',
      description: `${req.method} on ${req.url}`,
      level: res.statusCode < 400 ? 'INFO' : 'ERROR',
      date: Date.now(),
    });
  } catch (error) {
    throw new Error(error);
  }

  next();
};
