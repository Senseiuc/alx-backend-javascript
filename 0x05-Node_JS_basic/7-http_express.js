/**
 * 7, Using the express framework
 */

const fs = require('fs');
const express = require('express');

const app = express();
const port = 1245;
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

const countStudents = (path) => new Promise((resolve, reject) => {
  if (!path) {
    reject(new Error('Cannot load the database'));
  }
  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
    }
    if (data) {
      const content = data.toString('utf-8');
      const contentList = content.trim().split('\n');
      const headers = contentList.splice(0, 1)[0];

      let returnVal = `Number of students: ${contentList.length}`;
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
        returnVal += `\nNumber of students in ${key}: ${len}. List: ${names}`;
      }
      resolve(returnVal);
    }
  });
});

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  let resStr = 'This is the list of our students\n';
  countStudents(DB_FILE)
    .then((report) => {
      resStr += report;
      res.end(resStr);
    })
    .catch((err) => {
      resStr += err instanceof Error ? err.message : err.toString();
      res.end(resStr);
    });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

module.exports = app;
