const getRandomPositiveInteger = ( numberA, numberB) => {
  const lower = Math.ceil(Math.min(Math.abs(numberA), Math.abs(numberB)));
  const upper = Math.floor(Math.max(Math.abs(numberA), Math.abs(numberB)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.'
];

const DESCRIPTION = [
  'котики',
  'собачки',
  'природа'
];

const NAMES = [
  'Вася',
  'Петя',
  'Коля',
  'Оля',
  'Маша',
  'Даша'
];

const getTestComments = (value) =>({
  id: value,
  avatar: `img/avatar-${  getRandomPositiveInteger(1,6) }.svg`,
  message: getRandomArrayElement(MESSAGES),
  userName: getRandomArrayElement(NAMES),
});

const getTestPost = (value) => ({
  id: value,
  url: `photos/${value}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomPositiveInteger(15,200),
  comments: Array.from({length: getRandomPositiveInteger(0,20)}, (v,i) => getTestComments(i))
});

const getTestPosts = Array.from({length: 25}, (v,i) => getTestPost(i+1));
// eslint-disable-next-line no-console
console.log(getTestPosts);
