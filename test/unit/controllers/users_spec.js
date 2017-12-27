import chai from 'chai';
import sinon from 'sinon';
import UsersController from '../../../src/controllers/index';

const expect = chai.expect;

describe('controllers', () => {
  const defaultUser = {
    name: 'Default user',
    email: 'user@user.com',
    password: '123',
    permission: 'user',
  };
  const parameter = Object.assign({ email: 'user@user.com', password: '123' });
describe('smoke tests', ()=>{
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
describe('Happy way',()=>{
  describe('signin', () => {
    const token = 'xcvsdhefiwefoiwjendjsvbsdvbjsdvçiosdivsov';
    it.skip('should verify user and return a token', () => {
      const request = parameter;
      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };
  console.log(UsersController.signin(request));
      response.status.withArgs(parameter).returns(response);
      return UsersController.signin(request, response)
        .then(() => {
          sinon.assert.calledWith(response.status, 200);
        });
    });
  });
});
describe('bad way',()=>{
  it.skip('should return 400 when an error occurs', () => {
    const request = {};
    const response = {
      send: sinon.spy(),
      status: sinon.stub(),
    };

    response.status.withArgs(400).returns(response);
    UsersController.signin = sinon.stub();
    UsersController.signin.withArgs(parameter).rejects({ message: 'Error' });

    const usersController = new UsersController(defaultUser);

    return usersController.signin(request, response)
      .then(() => {
        sinon.assert.calledWith(response.send, 'Error');
      });
  });
});
})