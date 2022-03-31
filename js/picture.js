import {getTestPost} from './get-post.js';

const showListPictures = document.querySelector('.pictures');
const showPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const getTestPosts =  Array.from({length: 25}, (v,i) => getTestPost(i+1));


getTestPosts.forEach(({id,url,likes,comments}) => {
  const pictureView = showPictureTemplate.cloneNode(true);
  pictureView.querySelector('.picture__img').src=url;
  pictureView.querySelector('.picture__likes').textContent =likes;
  pictureView.querySelector('.picture__comments').textContent = comments.length;
  showListPictures.appendChild(pictureView);
  pictureView.id = id;
});


export {showPictureTemplate, getTestPosts};
