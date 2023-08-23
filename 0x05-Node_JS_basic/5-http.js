/**
 * 3. Reading a file asynchronously with Node JS
 */

const fs = require('fs');
const http = require('http');

const hostname = 'localhost';
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

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  let resStr = 'This is the list of our students\n';
  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    countStudents(DB_FILE)
      .then((report) => {
        resStr += report;
        res.end(resStr);
      })
      .catch((err) => {
        resStr += err instanceof Error ? err.message : err.toString();
        res.end(resStr);
      });
  }
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;
