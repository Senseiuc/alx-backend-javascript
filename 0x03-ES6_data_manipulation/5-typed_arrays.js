export default function createInt8TypedArray(length, pos, val) {
  if (pos >= length) {
    throw new Error('Position outside range');
  }
  const buf = new DataView(new ArrayBuffer(length), 0, length);
  buf.setInt8(pos, val);
  return buf;
}
