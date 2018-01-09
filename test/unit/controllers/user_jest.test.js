import { UserController } from '../../../src/controllers';

// dados mochados

let salva = 0;
let tojson = 0;
const mockModelo = {
  async findOne(req, res) {
    const user = new mockUserModel();
    throw new Error('Booom!!');
  },
};
class mockModel {
  constructor() {
    this.email = '123@eu.com';
    this.password = 'pass';
    this.token = '';
  }

async save(){
  salva += 1;
}

toJSON(value) { 
  tojson += 1;
  return `${value}`; 
}
};
function mockJwk(value){sing:(value)=>`${value}`;}
function mockSha(value) {return value;};
const user = UserController(mockModel, mockSha, mockJwk);
const user1 = UserController(mockModelo, mockSha, mockJwk);
const reqRes={
  status:code =>({ 
    send: value =>{ return value;}
  })
};
 
test('Create call save function', async()=>{
  await user.create({ body: { } }, reqRes);
  expect(salva).toBe(1);
});

test('Signin call toJson function', async()=>{
  await user1.signin( { body:{ password:'123'}},reqRes);
  expect(tojson).toBe(1);
})