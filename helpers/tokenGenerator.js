import JWT from 'jsonwebtoken';

export default (email) => new Promise((resolve, reject) => {
  if (!email) {
    reject();
  }
  const token = JWT.sign({ email }, 'JimCarrey');
  resolve(token);
});
