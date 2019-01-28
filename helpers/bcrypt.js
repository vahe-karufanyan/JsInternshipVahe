import bcrypt from 'bcrypt';

export function hash(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (error, hashed) => {
      if (error) {
        reject(error);
      }
      resolve(hashed);
    });
  });
}

export function compare(password, compairPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, compairPassword, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
}