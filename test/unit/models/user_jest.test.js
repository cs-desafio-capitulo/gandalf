import model from '../../../src/models';

test('model return error when send name null', () => {
  const user = new model();
  user.validate((err) => {
    expect(err.errors.name.message).toBe('Path `name` is required.');
  });
});

test('model return error when send email null', () => {
  const user = new model();
  user.validate((err) => {
    expect(err.errors.email.message).toBe('Path `email` is required.');
  });
});

test('model return error when send password null', () => {
  const user = new model();
  user.validate((err) => {
    expect(err.errors.password.message).toBe('Path `password` is required.');
  });
});

