export default function getListStudentIds(arr) {
  if (Array.isArray(arr)) {
    return arr.map((stid) => stid.id);
  }
  return [];
}
