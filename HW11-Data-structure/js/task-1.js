function validateTitle(title) {
  let valid = '';

  if (title.length < 20 && title.length > 2) {
    /^[A-Z]+[a-z]+[!?:.-]+/.test(title)
      ? (valid = 'VALID')
      : (valid = 'INVALID');
  } else {
    valid = 'INVALID';
  }

  return valid;
}

validateTitle('Title!');
validateTitle('s');
validateTitle('12title');
validateTitle('Title?');
validateTitle(false);
