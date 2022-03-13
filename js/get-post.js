import {MESSAGES, NAMES, DESCRIPTION} from './data.js';
import {getRandomPositiveInteger, getRandomArrayElement } from  './util.js';

const getTestComments = (commentIndex) =>({
  id: commentIndex,
  avatar: `img/avatar-${  getRandomPositiveInteger(1,6) }.svg`,
  message: getRandomArrayElement(MESSAGES),
  userName: getRandomArrayElement(NAMES),
});

const getTestPost = (postIndex) => ({
  id: postIndex,
  url: `photos/${postIndex}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomPositiveInteger(15,200),
  comments: Array.from({length: getRandomPositiveInteger(0,20)}, (v,i) => getTestComments((postIndex*1000)+i))
});

export {getTestPost};
