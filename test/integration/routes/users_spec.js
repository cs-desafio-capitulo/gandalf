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
  const agora = new Date;
  const defaultUser = {
    name: 'Default',
    email: 'user1@user.com',
    password: 'pass',
    permission: 'user',
    criate_date: agora,
    update_date: agora,
    last_login: agora,
  };

  const customId = '56cb91bdc3464f14678934ca';
  const newUser = Object.assign({}, { _id: customId, _v: 0 }, defaultUser);

  const expectedSavedUser = {
    __v: 0,
    _id: customId,
    name: 'Default',
    email: 'user1@user.com',
    password: sha256('pass').toString(),
    last_login: agora.toISOString(),
    update_date: agora.toISOString(),
    criate_date: agora.toISOString(),
    permission: 'user',
  };
  let tkw;
  describe('POST /signup', () => {
    context('when posting a valid user', () => {
      it('should return a new  user with status code 200', async (done) => {
        await request
          .post('/signup')
          .send(newUser)
          .expect(200, expectedSavedUser, done());
      });
    });
    context('when posting a null user', () => {
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
  describe('POST /singin', () => {
    context('when posting without password', () => {
      it('should return a error ', async () => {
        const User = { email: 'Newuser@user.com' };

        await request
          .post('/signin')
          .send(User)
          .expect(400, 'password: Path `password` is required. ');

      });
    });
    context('when posting wrong password', () => {
      it('should return a error ', async () => {
        const User = { email: 'Newuser@user.com', password: '1234556' };

        await request
          .post('/signin')
          .send(User)
          .expect(400, 'usuário não encontrado!');

      });
    });

    context('when posting a null user', () => {
      it('should return a error with status 400', async () => {
        const User = '';

        const resUser = await request
          .post('/signin')
          .send(User);
        expect(resUser.error.text).to.be.equal('password: Path `password` is required. email: Path `email` is required.');
        expect(resUser.statusCode).to.be.equal(400);
      });
    });

    describe('valid', () => {
      context('when posting a valid password and email', () => {
        it('should return a token ', async () => {
          const User = Object.assign({}, { email: 'user1@user.com', password: 'pass' });
          await request
            .post('/signin')
            .send(User)
            .expect((res) => {
              tkw = res.text;
              if (res.text.length > 50) return true;
            })
            .expect(200);
        });
      });
    });
  });

  context('validate token', () => {
    it('should be return token information valid', async () => {
      const token = { token: tkw };
      const valid = await request
        .post('/validate')
        .send(token);
      const resp = JSON.parse(valid.text);
      expect(resp._id).to.be.equal(customId);
      expect(resp.name).to.be.equal('Default');

    });
    it('should be return false when token has not valid', async () => {
      const token = '12345789';
      const valid = await request
        .post('/validate')
        .send(token);
      expect(valid.error.text).to.be.equal('jwt must be provided');

    });
  });


});
