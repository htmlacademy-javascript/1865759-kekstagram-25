const randomNumber = (max, min) => {
  if (Number.isInteger(max) && Number.isInteger(min)) {
    if (max >= 0 && min >= 0) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return false;
  }
  return false;
};

const checkStringLength = (str, max) => typeof (str) === 'string' && str.length <= max;

randomNumber(1,5);
checkStringLength (1,10);
