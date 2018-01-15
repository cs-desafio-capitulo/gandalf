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

test('Create call save function', async () => {
  await user.create({ body: { } }, mockRes);
  expect(mockRes.status.code).toBe(200);
});

test('Signin call toJson function', async () => {
  await user.signin({ body: { password: 'pass' } }, mockRes);
  expect(mockRes.status.code).toBe(200);
});
