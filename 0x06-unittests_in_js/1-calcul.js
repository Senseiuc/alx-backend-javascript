const calculateNumber = (type, a, b) => {
  const val2 = Math.round(b);
  const val1 = Math.round(a);
  switch (type) {
    case 'DIVIDE':
      if (val2 === 0) {
        return 'Error';
      }
      return val1 / val2;
    case 'SUBTRACT':
      return val1 - val2;
    case 'SUM':
      return val1 + val2;
    default:
      return 'Error';
  }
};
module.exports = calculateNumber;
