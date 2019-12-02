const complexFunction = function (arg1, arg2) {
  return arg1 + arg2;
};

const cachedFunction = complexFunction.bind(null, 'foo');

cachedFunction('bar');
cachedFunction('bar');
cachedFunction('baz');