// Реализовать ф-ции чисел и ф-ции операторов таким образом чтобы они работали в формате число - оператор - число
function zero(a) {
  return a ? eval(`0${a}`) : 0;
}
function one(a) {
  return a ? eval(`1${a}`) : 1;
}
function two(a) {
  return a ? eval(`2${a}`) : 2;
}
function three(a) {
  return a ? eval(`3${a}`) : 3;
}
function four(a) {
  return a ? eval(`4${a}`) : 4;
}
function five(a) {
  return a ? eval(`5${a}`) : 5;
}
function six(a) {
  return a ? eval(`6${a}`) : 6;
}
function seven(a) {
  return a ? eval(`7${a}`) : 7;
}
function eight(a) {
  return a ? eval(`8${a}`) : 8;
}
function nine(a) {
  return a ? eval(`9${a}`) : 9;
}

function plus(s) {
  const res = `+${s}`;
  return res;
}
function minus(s) {
  const res = `-${s}`;
  return res;
}
function multiply(s) {
  const res = `*${s}`;
  return res;
}
function divide(s) {
  const res = `/${s}`;
  return res;
}

seven(multiply(five())); // 35
four(plus(nine())); // 13
eight(minus(three())); // 5
six(divide(two())); // 3
one(plus(zero())); // 1