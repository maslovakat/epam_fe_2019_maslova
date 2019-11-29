
function getSumOfStrings(firstString, secondString) {
  const result = [];
  let inMemory = 0;
  let tmp = 0;
  const sortedStrings = [firstString, secondString];

  sortedStrings.sort((a, b) => {
    return b.length - a.length;
  });

  for (let i = sortedStrings[0].length - 1; i >= 0; i--) {
    tmp = ((Number(sortedStrings[0][i])) + Number((sortedStrings[1][i - (sortedStrings[0].length - sortedStrings[1].length)] || 0)));
    if (i === 0) {
      result.unshift(Number(inMemory + tmp));
    }
    else if (tmp > 9) {
      result.unshift(Number(tmp - 10 + inMemory));
      inMemory = 1;
    } else {
      result.unshift(Number(tmp + inMemory));
      inMemory = 0;
    }
  }
  return result.join('');
}

getSumOfStrings('123', '324');
getSumOfStrings('11111111111111111111111111111111111111111111111111', '23333333333333333333333333333333333333333333333333');

getSumOfStrings('234', '197');
getSumOfStrings('999', '112');
getSumOfStrings('1111', '11223344');
getSumOfStrings('112233', '11');