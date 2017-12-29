import sinon from 'sinon';
import { expect } from 'chai';
import UsersController from '../../../src/controllers/index';

describe('controllers', () => {
  const defaultUser = Object.assign({
    name: 'Default user',
    email: 'user@user.com',
    password: '123',
    permission: 'user',
  });
  const parameter = Object.assign({ email: 'user@user.com', password: '123' });
  const res = {
    status:sinon.stub(),
    send:sinon.spy(),
  };
 
  describe('smoke tests', () => {
    describe('create', () => {
      it('should be a function', () => {
        expect(UsersController.create).to.be.a('function');
      });
    });
    describe('signin', () => {
      it('should be a function', () => {
        expect(UsersController.signin).to.be.a('function');
      });
    });
  });
  describe('Happy way', () => {
    
    describe('signin', () => {
       it('should return a token when call signin function', () => {
        
      });
    });
    describe('singup', () => {
      it('should call a create function', () => {
    
      });
    });
  });
  describe('bad way', () => {
   
    describe('singin', () => {
      it('should return 400 when an error occurs ', () => {
        const status = 400;
        sinon.stub(UsersController,'signin').withArgs().rejects({ message: 'Error' });
        const result = UsersController.signin()
        .then(() => {
          expect(result.status).to.be.eql(status);
        });
       
    });
  });
  describe('singup', () => {
    it('should return 400 when an error occurs ', () => {
      const status = 400;
      sinon.stub(UsersController,'create').withArgs().rejects({ message: 'Error' });
      const result = UsersController.create()
        .then(() => {
          expect(result.status).to.be.eql(status);
        });
      
    });
  });
  });
});
