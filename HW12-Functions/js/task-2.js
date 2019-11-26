function getSumOfStrings(firstString, ...rest) {
  const result = [];
  const resultLength = [firstString, ...rest];

  resultLength.sort((a, b) => {
    return b.length - a.length;
  });

  for (let i = 0; i < resultLength[0].length; i++) {
    result.push(String((+resultLength[0][i] || 0) + (+resultLength[1][i] || 0))); // we can add "+ (+resultLength[2][i] || 0)" to get sum of three srtings and so on
  }
  return result.join('');
}

getSumOfStrings('123', '324');
getSumOfStrings('111111', '233333');
getSumOfStrings('112233', '11223344');
getSumOfStrings('112233', '11');
