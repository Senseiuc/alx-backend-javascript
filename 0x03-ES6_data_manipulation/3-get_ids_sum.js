export default function getStudentIdsSum(students) {
  return students.reduce((sum, student) => sum.id || sum + student.id, 0);
}
