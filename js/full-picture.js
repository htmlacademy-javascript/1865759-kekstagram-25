/* eslint-disable no-unused-vars */
import {isEscapeKey, isEnterKey} from './util.js';
import {getTestPosts} from './picture.js';


const fullPicture = document.querySelector('.big-picture');
const userModalOpenPictures = document.querySelectorAll('.picture');
const userModalClosePicture = fullPicture.querySelector('.big-picture__cancel');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

const commetsSection = (commentsDict) => {
  const comentsSection = fullPicture.querySelector('.social__comments');
  comentsSection.textContent = ' ';
  for(const comentDict of commentsDict){
    const comment = document.createElement('li');
    comment.classList.add('social__comment');
    comment.innerHTML = `<img class="social__picture"
      src="${comentDict.avatar}"
      alt="${comentDict.userName}"
      width="35" height="35">
      <p class="social__text">${comentDict.message}</p>`;
    comentsSection.appendChild(comment);}
};

function openUserModal (picturesSrc) {
  const getPost = getTestPosts.filter((item) => item.url === picturesSrc)[0];
  fullPicture.querySelector('img').src = getPost.url;
  fullPicture.querySelector('.likes-count').textContent  = getPost.likes;
  fullPicture.querySelector('.comments-count').textContent  = getPost.comments.length;
  fullPicture.querySelector('.social__caption').textContent = getPost.description;
  fullPicture.querySelector('.social__comment-count').classList.add('hidden');
  fullPicture.querySelector('.comments-loader').classList.add('hidden');
  commetsSection(getPost.comments);
  document.querySelector('body').classList.add('modal-open');
  fullPicture.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscKeydown);
}

function closeUserModal () {
  document.querySelector('body').classList.remove('modal-open');
  fullPicture.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
}

userModalOpenPictures.forEach((userModalOpenPicture) => {
  userModalOpenPicture.addEventListener('click', (evt) => {
    openUserModal(userModalOpenPicture.querySelector('img').getAttribute('src'));
  });
  userModalOpenPicture.addEventListener('keydown', (evt) => {
    if (isEnterKey(evt)) {
      openUserModal(userModalOpenPicture.querySelector('img').getAttribute('src'));
    }
  });
});

userModalClosePicture.addEventListener('click', () => {
  closeUserModal();
});

userModalClosePicture.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeUserModal();
  }
});
