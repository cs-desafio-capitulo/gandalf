import UsersController from '../../../src/controllers/users';
import sinon from 'sinon';
import User from '../../../src/models/user';

describe('Controller: users', () => {
  const defaultUser = [{
    __v: 0,
    _id: "56cb91bdc3464f14678934ca",
    name: 'Default user',
    email:'user@user.com',
    password:'', 
    permission:'user',
    criate_date:Date.now,
    update_date: Date.now,
    last_login:Date.now,
    token:'1234567'
  }];

  const defaultRequest = {
    params: {}
  };

  describe('signin()', () => {
    it('should verify user and return a token', () => {
      const response = {
        send: sinon.spy()
      };
      User.find = sinon.stub();

      User.find.withArgs({name,password}).resolves(defaultUser);

      const usersController = new UsersController(User);

      return usersController.get(defaultRequest, response)
        .then(() => {
          sinon.assert.calledWith(response.send, defaultUser);
        });
    });

    it('should return 400 when an error occurs', () => {
      const request = {};
      const response = {
        send: sinon.spy(),
        status: sinon.stub()
      };

      response.status.withArgs(400).returns(response);
      User.find = sinon.stub();
      User.find.withArgs({name,password}).rejects({ message: 'Error' });

      const usersController = new UsersController(Product);

      return usersController.get(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, 'Error');
        });
    });

  });

  describe('getById()', () => {
    it('should call send with one product', () => {
      const fakeId = 'a-fake-id';
      const request = {
        params: {
          id: fakeId
        }
      };
      const response = {
        send: sinon.spy()
      };

      Product.find = sinon.stub();
      Product.find.withArgs({ _id: fakeId }).resolves(defaultProduct);

      const productsController = new ProductsController(Product);

      return productsController.getById(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, defaultProduct);
        });
    });
  });

});

