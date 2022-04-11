import {renderFullPicture} from './full-picture.js';

const showListPictures = document.querySelector('.pictures');
const showPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const renderPosts = (posts) => {
  posts.forEach(({id,url,likes,comments}) => {
    const pictureView = showPictureTemplate.cloneNode(true);
    pictureView.querySelector('.picture__img').src=url;
    pictureView.querySelector('.picture__likes').textContent =likes;
    pictureView.querySelector('.picture__comments').textContent = comments.length;
    showListPictures.appendChild(pictureView);
    pictureView.id = id;
  });
  renderFullPicture(posts);
};

export { renderPosts };
