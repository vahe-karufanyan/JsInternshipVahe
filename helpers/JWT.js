import JWT from 'jsonwebtoken';

const secret = 'JimCarrey';

export function isVerified(token) {
  return new Promise((resolve, reject) => {
    if (!token) {
      reject();
    }
    resolve(JWT.verify(token, secret));
  });
} 

export function tokenGenerator(email) {
  return new Promise((resolve, reject) => {
    if (!email) {
      reject();
    }
    resolve(JWT.sign({ email }, secret));
  });
}