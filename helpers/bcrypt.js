import bcrypt from 'bcrypt';

export function hash(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hashed) => {
      if (err) {
        reject(err);
      }
      resolve(hashed);
    });
  });
}

export function compare(password, compairPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, compairPassword, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}