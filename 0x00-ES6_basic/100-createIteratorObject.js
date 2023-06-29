export default function createIteratorObject(report) {
  return (function* iterate() {
    for (const dep of Object.values(report.allEmployees)) {
      for (const emp of dep) {
        yield emp;
      }
    }
  }());
}
