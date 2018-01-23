import Model from '../../../src/models';

test('model return error when send name null', () => {
  const user = new Model();
  user.validate((err) => {
    console.log(err);
    expect(err.errors.name.message).toBe('Path `name` is required.');
  });
});

test('model return error when send email null', () => {
  const user = new Model({name:'alberto'});
  user.validate((err) => {
    expect(err.errors.email.message).toBe('Path `email` is required.');
  });
});

test('model return error when send password null', () => {
  const user = new Model();
  user.validate((err) => {
    expect(err.errors.password.message).toBe('Path `password` is required.');
  });
});

test('model return instance when send valid data', () => {
  const data ={name:'User Name', password: 'UserPass', email:' user@user.com.br'};
  const user = new Model();
  expect(typeof user).toBe('object');
});
