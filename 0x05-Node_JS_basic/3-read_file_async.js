/**
 * 3. Reading a file asynchronously with Node JS
 */

const fs = require('fs');

const countStudents = (path) => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
    }
    if (data) {
      const content = data.toString('utf-8');
      const contentList = content.trim().split('\n');
      const headers = contentList.splice(0, 1)[0];

      console.log(`Number of students: ${contentList.length}`);
      const field = headers.split(',').indexOf('field');
      const firstname = headers.split(',').indexOf('firstname');
      const dict = {};

      for (const i of contentList) {
        const sublist = i.split(',');
        if (!dict[sublist[field]]) {
          dict[sublist[field]] = [];
        }
        dict[sublist[field]].push(sublist[firstname]);
      }
      for (const [key, value] of Object.entries(dict)) {
        const len = value.length;
        const names = value.join(', ');
        console.log(`Number of students in ${key}: ${len}. List: ${names}`);
      }
      resolve(true);
    }
  });
});

module.exports = countStudents;
