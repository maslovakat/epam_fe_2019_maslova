function patchObject(greetings, howOldAreYou, showSuccess) {
  this.name = this.name || 'unknown';
  this.age = this.age || 'age is unavailable';
  this.hello = greetings;
  this.myAge = howOldAreYou;
  this.showSuccessKoef = showSuccess;
  return this;
}

let obj = {
  name: 'Ivan',
  surname: 'Baraban',
  age: 42,
  score: 12,
};

let obj2 = {
  name: 'Petya',
  surname: 'Padawan',
  age: 52,
  score: 28,
};

const greetings = function (greeting) {
  return `${greeting}, my name is ${this.name}`;
};
const showSuccess = function () {
  return (this.age / this.score) || 0;
};
const howOldAreYou = function () {
  return this.age;
};

obj = patchObject.call(obj, greetings, howOldAreYou, showSuccess);
obj2 = patchObject.call(obj2, greetings, howOldAreYou);
// obj3 = patchObject.call(null, greetings, howOldAreYou, showSuccess);

obj.myAge(); // 42
obj.showSuccessKoef(); // 3.5
obj.hello('yo'); // yo, my name is Ivan
obj2.myAge(); // 52
obj2.hello('Hi sir'); // Hi sir, my name is Petya
// obj3.hello('Good Day'); // Good Day, my name is unknown
// obj3.showSuccessKoef(); // 0
// obj3.myAge(); // age is unavailable