function sum(num1, num2) {
  const numbers = [num1, num2];

  numbers.forEach((el) => {
    if (Number.isInteger(el)) {
      el % 3 === 0 || el % 5 === 0 || el % 15 === 0
        ? numbers.push(-el)
        : numbers.push(el);
    } else {
      numbers.push(+el);
    }
  });
  numbers.splice(0, 2);
  return numbers[0] + numbers[1];
}

sum('25', 15);
sum(41, '3');
sum('3', 45);
sum('15', 15);
