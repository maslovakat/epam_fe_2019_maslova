
window.onerror = (message, url, line, col, error) => {
  console.log(message, url, line, col, error);
};
function parseJSON(json) {
  try {
    JSON.parse(json);
  } catch (error) {
    console.log('This is an error, because JSON has wrong format');
    throw new Error(error);
  }
  if (!JSON.parse(json).name || !JSON.parse(json).company) {
    console.log('This is an error, because "name" or "company" properties don\'t exist');
    throw new Error('This is an error, because "name" or "company" properties don\'t exist');
  }
  return JSON.parse(json);
}

parseJSON('{"name":"Student","company":"EPAM"}');
parseJSON('{"name":"Student","surname":"Cool"}');
parseJSON('name:Student,company:EPAM');
