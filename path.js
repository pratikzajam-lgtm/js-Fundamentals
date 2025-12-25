const path = require('path');

// Get filename from a path
const filename = path.basename('/users/docs/file.txt');
console.log(filename);

// Get filename without extension
const filenameWithoutExt = path.basename('/users/docs/file.txt', '.txt');
console.log(filenameWithoutExt);