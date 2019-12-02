
function sum(...rest) {
  let result = 0;
  [...rest].map((i) => result += i);
  return result;
}

function mul(...rest) {
  let result = 1;
  [...rest].map((i) => result *= i);
  return result;
}

const applyAll = (func, ...rest) => {
  return func.call(null, ...rest);
};

// function sum(a, b, c) {
//   return a + b + c;
// }

// function mul(a, b, c) {
//   return a * b * c;
// }

// const applyAll = function(func, a, b, c) {
//   return func.call(null, a, b, c);
// };

applyAll(sum, 1, 2, 3);
applyAll(mul, 2, 3, 4);