//buffers in node js


// Create a buffer from a string
const buf = Buffer.from('Hello, Node.js!');

// Buffers can be converted to strings
console.log(buf.toString()); // 'Hello, Node.js!'

// Access individual bytes
console.log(buf[0]); // 72 (ASCII for 'H')

// Buffers have a fixed length
console.log(buf.length); // 15