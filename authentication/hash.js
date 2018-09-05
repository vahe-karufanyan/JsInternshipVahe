import bcrypt from 'bcrypt';

export default function hashAndSave(password) {
    bcrypt.hash(password, 10, function(err, hash) {
        return hash;
  });
}
