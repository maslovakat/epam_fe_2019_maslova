function isEnoughChangeForEachPerson(queue) {
  let change = 0;
  let answer = '';
  if (Number(queue[0]) === 25) {
    change += 25;
    for (let i = 1; i < queue.length; i++) {
      (Number(queue[i]) - change) <= 25
        ? (change += 25)
        : (answer = `NO. Vasya will not have enough money to give change to ${queue[i]} dollars`);
    }
  }
  else {
    answer = `NO. Vasya will not have enough money to give change to ${queue[0]} dollars`;
  }
  return answer === '' ? 'YES' : answer;
}

isEnoughChangeForEachPerson([25, 25, 50]);
isEnoughChangeForEachPerson([25, 100]);
isEnoughChangeForEachPerson([25, 25, 50, 100]);
isEnoughChangeForEachPerson([25, 50, 100]);
isEnoughChangeForEachPerson(['25', '25', '50', '100']);
isEnoughChangeForEachPerson(['25', '50', '100']);
isEnoughChangeForEachPerson([50, 100]);
