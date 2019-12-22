function calculateFibByRecursion(sequenceLength) {
  if (sequenceLength === 1 || sequenceLength === 2) {
    return 1;
  }
  return calculateFibByRecursion(sequenceLength - 1) + calculateFibByRecursion(sequenceLength - 2);
}

function calculateFibByCycle(sequenceLength) {
  let tmp;
  let first = 1;
  let second = 1;
  for (let i = 2; i < sequenceLength; i++) {
    tmp = first;
    first = second;
    second = tmp + first;
  }
  return second;
}

calculateFibByRecursion(3); // 2
calculateFibByCycle(7); // 13

const test = (fib, label, last = 30, iterationsQty = 30) => {
  const start = performance.now();

  for (let i = 1; i <= iterationsQty; i++) {
    fib(last);
  }
  const timePassed = (performance.now() - start).toFixed(4);
  console.log(`${label}: ${timePassed} ms`);
};

test(calculateFibByCycle, 'Cycle');
test(calculateFibByRecursion, 'Recursion');

// recursion is slowly because each calling function it stores references to all previous lexical environment, and objects stay being in closure, it watsted a lot of memory
// but in cycle, instances are cleared off after every iteration
