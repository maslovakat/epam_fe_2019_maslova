function parseJSON(json) {
  try {
    JSON.parse(json);
  } catch (error) {
    return null;
  }
  return JSON.parse(json);
}

parseJSON('{"role":"Student", "company":"EPAM", "mentor":"Cool Mentor"}');
parseJSON('role:Student, company:EPAM, mentor:Cool Mentor');
