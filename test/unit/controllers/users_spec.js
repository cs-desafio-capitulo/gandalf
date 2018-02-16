import { expect } from 'chai';
import { UserController, calcExpDate } from '../../../src/controllers';
import jwt from 'jsonwebtoken';
describe('controllers', () => {
  describe('smoke tests', () => {
    describe('factory function', () => {
      it('should return an object', () => {
        expect(typeof UserController()).to.be.equal('object');
      });
    });
    describe('User controller object', () => {
      const userController = UserController({});

      it('should has "create" method', () => {
        expect(typeof userController.create).to.be.equal('function');
      });

      it('should has "signin" method', () => {
        expect(typeof userController.signin).to.be.equal('function');
      });

      it('should has "validate" method', () => {
        expect(typeof userController.validate).to.be.equal('function');
      });
    });
  });

  describe('Happy way', () => {
    let instances = 0;
    let salva = 0;
    let busca = 0;

    const fakeDatabase = {
      constructor() {

      },
      async findOneAndUpdate(req, res) {
        busca += 1;
        const user = { _id: 'fakeId', last_login: new Date(), token: 'token' };
        user.toJSON = () => user;
        return user;
      },

    };
    class mockUserModel {
      constructor() {
        instances += 1;
        this.email = '123@eu.com';
        this.password = 'pass';
        this.token = '';
      }

      async save() {
        this.token = 'token';
        salva += 1;
      }
    }
    const mockSHA = value => `${value}`;
    const mockJwk = { sign: value => `${value}`, verify: jwt.verify };
    let resposta = '';
    const mockReq = { body: { name: 'user', email: '123@eu.com', password: 'pass' } };
    const mockRes = {
      status: code =>
        // TODO: create new test "should call res.status and res.send"
        // expect(code).to.be.equal(200);
        ({

          send: (value) => {
            console.log(value);
            resposta = value;
            return value;
            // ;
          },
        }),

    };

    describe('signin', () => {
      const userController = UserController(fakeDatabase, mockSHA, mockJwk);
      it('should call findOne funtion', async () => {
        busca = 0;
        await userController.signin(mockReq, mockRes);
        expect(busca).to.be.equal(1);
      });

      it('should calculate exp date', () => {
        expect(calcExpDate(300)).to.be.a('Date');
      });

      it('should res send token', async () => {
        await userController.signin(mockReq, mockRes);
        expect(resposta).to.be.a('string');
      });

    });

    describe('singup', () => {
      const userController = UserController(mockUserModel, mockSHA, mockJwk);
      it('should call UserModel', async () => {
        instances = 0;
        await userController.create(mockReq, mockRes);
        expect(instances).to.be.equal(1);
      });
      it('should res send instance of mockUserModel', async () => {
        await userController.create(mockReq, mockRes);
        expect(resposta instanceof mockUserModel).to.be.equal(true);
      });
      it('should call save funtion', async () => {
        salva = 0;
        await userController.create(mockReq, mockRes);
        expect(salva).to.be.equal(1);
      });
    });

    describe('validate', () => {
      const userController = UserController(fakeDatabase, mockSHA, mockJwk);
      const mockReq1 = { body: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1NmNiOTFiZGMzNDY0ZjE0Njc4OTM0Y2EiLCJuYW1lIjoiRGVmYXVsdCIsImVtYWlsIjoidXNlcjFAdXNlci5jb20iLCJwYXNzd29yZCI6ImQ3NGZmMGVlOGRhM2I5ODA2YjE4Yzg3N2RiZjI5YmJkZTUwYjViZDhlNGRhZDdhM2E3MjUwMDBmZWI4MmU4ZjEiLCJjcmlhdGVfZGF0ZSI6IjIwMTctMTItMjJUMTY6MDk6MzIuMzk4WiIsIl9fdiI6MCwibGFzdF9sb2dpbiI6IjIwMTctMTItMjJUMTY6MDk6MzIuMzk4WiIsInVwZGF0ZV9kYXRlIjoiMjAxNy0xMi0yMlQxNjowOTozMi4zOThaIiwicGVybWlzc2lvbiI6InVzZXIiLCJleHAiOjE1MTYwOTkzNDYyNjAsImlhdCI6MTUxNjA5NzU0Nn0.2N0dgWaMd7bEMeh-V_ghWi3RPLP60SRgvHdoqoU8wM8' } };
      it('should return a user Id', async () => {
        await userController.validate(mockReq1, mockRes);
        expect(resposta._id).to.be.equal('56cb91bdc3464f14678934ca');
      });

      it('should return a date Expiration Token', () => {

      })
    })
  });
  describe('bad way', () => {
    const fakeDatabase = {
      async findOneAndUpdate(req, res) {
        throw new Error('Booom!!');
      },
    };
    class mockUserModel {
      constructor() {
        this.password = 'pass';
      }
      async save() {
        throw new Error('Booom!!');
      }
    }
    const mockSHA = value => `${value}`;
    const mockJwk = { sing: value => `${value}` };
    const mockReq = { body: {} };
    let callCountStatus = 0;
    let callCountSend = 0;
    const mockRes = {
      status: (code) => {
        callCountStatus += 1;
        expect(code).to.be.equal(400);
        return {
          send: (value) => {
            callCountSend += 1;
          },
        };
      },
    };
    describe('singin', () => {
      const userController = UserController(fakeDatabase, mockSHA, mockJwk);
      it('should count status equal 1 and count send equal 1 ', async () => {
        callCountStatus = 0;
        callCountSend = 0;
        await userController.signin(mockReq, mockRes);
        console.log({ callCountStatus, callCountSend });
        expect(callCountStatus).to.be.equal(1);
        expect(callCountSend).to.be.equal(1);
      });

    });
    describe('singup', () => {
      const userController = UserController(mockUserModel, mockSHA, mockJwk);
      it('should call status and send only once ', async () => {
        callCountStatus = 0;
        callCountSend = 0;
        await userController.create(mockReq, mockRes);
        expect(callCountStatus).to.be.equal(1);
        expect(callCountSend).to.be.equal(1);
      });
    });
    describe('validate', () => {
      const userController = UserController(fakeDatabase, mockSHA, mockJwk);
      it('should return 400 when token is invalid', async () =>{
        callCountStatus = 0;
        callCountSend = 0;
        const user =  await userController.validate({body:{token:'token'}}, mockRes);
       console.log(mockRes.status);
       expect(callCountStatus).to.be.equal(1);
      expect(callCountSend).to.be.equal(1);
      })
    })
  });
});

