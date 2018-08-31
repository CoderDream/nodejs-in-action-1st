let morgan = require('morgan');
let format = morgan['tiny'];
let fn = morgan.compile(format);

console.log(fn.toString());