import { UserController } from '../../../src/controllers';

// dados mochados

let salva = 0;
const busca = 0;

class mockModel {
  constructor() {
    this.email = '123@eu.com';
    this.password = 'pass';
    this.token = '';
  }

  async save() {
    salva += 1;
    mockRes.status.code = 200;
    return true;
  }
}
const toJSON = jest.fn();
toJSON.mockReturnValue(1);
const save = jest.fn();
save.mockReturnValue(true);
const findOne = jest.fn();
findOne
  .mockReturnValue({ status: 200 });

function mockJwk(value) { value => `${value}`; }
function mockSha(value) { return value; }
const user = UserController(mockModel, mockSha, mockJwk);

const mockRes = {
  status: code => ({
    send: value => value,
  }),
};

test('Create return status 200', async () => {
  await user.create({ body: {name:'123', password:'123',email:'123' } }, mockRes);
  expect(mockRes.status.code).toBe(200);
});

test('Signin return status 200', async () => {
  await user.signin({ body: { password: 'pass', email:'123' } }, mockRes);
  expect(mockRes.status.code).toBe(200);
});
