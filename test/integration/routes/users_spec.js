import supertest from 'supertest';
import mongoose from 'mongoose';
import sha256 from 'crypto-js/sha256';
import jwt from 'jsonwebtoken';
import { expect } from 'chai';
import Myapp from '../../../src/app';
import UserModel from '../../../src/models';
import Controller from '../../../src/controllers';


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
    context('when posting a user', () => {
      it('should return a new user with status code 200', (done) => {
        request
          .post('/signup')
          .send(newUser)
          .expect(200, expectedSavedUser, done);
      });
    });
  });

  describe('POST /singin', () => {
    context('when posting a password', () => {
      it('should return a token ', (done) => {
        const User = Object.assign({}, { email: 'user1@user.com', password: 'pass' });
        request
          .post('/signin')
          .send(User)
          .expect((res) => {
            if (res.length > 50) return true;
          })
          .expect(200, done);
      });
    });
  });

  describe('POST /singin', () => {
    context('when posting without password', () => {
      it('should return a error ', (done) => {
        const User = Object.assign({}, { email: 'Newuser@user.com' });
        request
          .post('/signin')
          .send(User)
          .expect(400,'dados de entrada incorretos', done);
      });
    });
  });

  context('when create a null user', () => {
    it('should return a error with status 400', async () => {
      const mockres =  {
        status: code =>
          ({
  
            send: (value) => {
              return value;
              // ;
            },
          }),
  
      };
      await Controller.create({}, mockres);
      expect(mockres.code).to.be.equal(400);
    });
  });
  context('when posting a null user', () => {
    it('should return a error with status 400', (done) => {
      const User = '';
      request
        .post('/signup')
        .send(User)
        .expect(400, done);
    });
  });
});
