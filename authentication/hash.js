import bcrypt from 'bcrypt';

export default function hashAndSave(password) {
    return bcrypt.hash(password, 10, function(err, hash) {
        return hash;
  });
}
