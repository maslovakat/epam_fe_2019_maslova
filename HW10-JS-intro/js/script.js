// task 1

let age = 12;

if (age > 5) {
  age = 5;
  console.log('More than 5');
} else if (age < 10) {
  console.log('Less than 5');
}

// we have conditional statement, first test in "if ( )" our condition, if it's true, the code will execute, but if it's false we go to a new condition for testing "else if ( )", in this case we didn't go to second condition, because first is true (that's why we didn't call second console). In first conditional state we assigned a new value in the variable age. So we will have had "Less than 5" in console, when we dublicate our condition statement, because age=5 and skipped first condition

// task 2
let message;
const login = 'Maks';

// use ternary operator

login === 'Maks'
  ? (message = `Hi, ${login}`)
  : login === 'Serg'
    ? (message = `Hi, ${login}`)
    : login === ''
      ? (message = 'Hi, undefined')
      : (message = '');

// use switch...case

switch (login) {
  case 'Maks':
    message = `Hi, ${login}`;
    break;
  case 'Serg':
    message = `Hi, ${login}`;
    break;
  case '':
    message = 'Hi, undefined';
    break;
  default:
    message = '';
    break;
}

console.log(message);
