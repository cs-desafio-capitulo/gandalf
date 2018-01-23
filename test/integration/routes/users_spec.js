import supertest from 'supertest';
import mongoose from 'mongoose';
import sha256 from 'crypto-js/sha256';
import { expect } from 'chai';
import Myapp from '../../../src/app';
import UserModel from '../../../src/models';

describe('userRoutes: Users', () => {
  let request;

  before(async () => {
    const app = await Myapp();
    await UserModel.remove({});
    request = supertest(app);
  });

  after(() => {
    mongoose.connection.close();
  });

  const defaultUser = {
    name: 'Default',
    email: 'user1@user.com',
    password: 'pass',
    permission: 'user',
    criate_date: 1513958972398,
    update_date: 1513958972398,
    last_login: 1513958972398,
  };

  const customId = '56cb91bdc3464f14678934ca';
  const newUser = Object.assign({}, { _id: customId, _v: 0 }, defaultUser);

  const expectedSavedUser = {
    __v: 0,
    _id: customId,
    name: 'Default',
    email: 'user1@user.com',
    password: sha256('pass').toString(),
    permission: 'user',
    criate_date: '2017-12-22T16:09:32.398Z',
    update_date: '2017-12-22T16:09:32.398Z',
    last_login: '2017-12-22T16:09:32.398Z',
  };

  describe('POST /signup', () => {
    context('when posting a validuser', () => {
      it('should return a new  user with status code 200', async () => {
        await request
          .post('/signup')
          .send(newUser)
          .expect(200, expectedSavedUser);
      });
    });
  });

  describe('POST /singin', () => {
    context('when posting a valid password and email', () => {
      it('should return a token ', async () => {
        const User = Object.assign({}, { email: 'user1@user.com', password: 'pass' });
        await request
          .post('/signin')
          .send(User)
          .expect((res) => {
            if (res.length > 50) return true;
          })
          .expect(200);
      });
    });
  });

  describe('POST /singin', () => {
    context('when posting without password', () => {
      it('should return a error ', async () => {
        const User = { email: 'Newuser@user.com' };

        const resUser = await request
          .post('/signin')
          .send(User)
          .expect(400, 'password: Path `password` is required. ');

      });
    });
  });

  context('signin when posting a null user', () => {
    it('should return a error with status 400', async () => {
      const User = '';

      const resUser = await request
        .post('/signin')
        .send(User);
      expect(resUser.error.text).to.be.equal('password: Path `password` is required. email: Path `email` is required.');
      expect(resUser.statusCode).to.be.equal(400);


    });
  });

  context('signup when posting a null user', () => {
    it('should return a error with status 400', async () => {
      const User = '';
      const resUser = await request
        .post('/signup')
        .send(User);
      expect(resUser.error.text).to.be.equal('User validation failed: name: Path `name` is required.');
      expect(resUser.statusCode).to.be.equal(400);

    });
  });
});
