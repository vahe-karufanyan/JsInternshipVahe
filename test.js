const fs = require('fs');
const path = require('path');

fs.writeFileSync(path.resolve('images', 'test.txt'), 'test');
