// import fs from 'fs'

//readfile

// fs.readFile('output.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error('Error reading file:', err);
//         return;
//     }
//     console.log('File content:', data);
// });


// write file synchronously
// import fs from 'fs'

// fs.writeFileSync("data.txt", "Hello, this is sync file write");

// console.log("File written successfully");




//write file asychronously
const fs = require('fs').promises;

async function writeFileExample() {
  try {
    
    await fs.writeFile('output.json', 'Hello, World!', 'utf8');

    
    const data = { name: 'John', age: 30, city: 'New York' };
    await fs.writeFile('data.json', JSON.stringify(data, null, 2), 'utf8');

    console.log('Files created successfully');
  } catch (err) {
    console.error('Error writing files:', err);
  }
}

writeFileExample();