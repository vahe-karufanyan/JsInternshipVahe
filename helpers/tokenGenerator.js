import JWT from 'jsonwebtoken';

export default (res, email) => new Promise((resolve, reject) => {
  if (!email) {
    reject();
  }
  const token = JWT.sign({ email }, 'JimCarrey');
  res.cookie('access_token', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 12,
  });
  resolve(200);
});
