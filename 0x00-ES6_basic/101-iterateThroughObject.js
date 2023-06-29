export default function iterateThroughObject(reportWithIterator) {
  const emps = [];

  for (const emp of reportWithIterator) {
    emps.push(emp);
  }

  return emps.join(' | ');
}
