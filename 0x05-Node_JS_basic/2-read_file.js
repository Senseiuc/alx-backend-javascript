/**
 * 2. Reading a file synchronously with Node JS
 */

const fs = require('fs');

const countStudents = (path) => {
  if (!fs.existsSync(path)) {
    throw new Error('Cannot load the database');
  }
  if (!fs.statSync(path).isFile()) {
    throw new Error('Cannot load the database');
  }
  const content = fs.readFileSync(path).toString('utf-8');
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
};

module.exports = countStudents;
