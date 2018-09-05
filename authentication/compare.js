import bcrypt from 'bcrypt';

export default function compare(password) {
    bcrypt.compare(password, hash, function(err, res) {
    if(res) {
        return true;
    } else {
        return false
    } 
  });
}