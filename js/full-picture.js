import { isEscapeKey, isEnterKey } from './util.js';
import { getTestPosts } from './picture.js';


const fullPicture = document.querySelector('.big-picture');
const userModalOpenPictures = document.querySelectorAll('.picture');
const userModalClosePicture = fullPicture.querySelector('.big-picture__cancel');
const socialComentShowCounter = fullPicture.querySelector('.comments-show');
const socialComentAddButton = fullPicture.querySelector('.comments-loader');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

const generateComent = (comentDict) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');
  comment.innerHTML = `<img class="social__picture"
    src="${comentDict.avatar}"
    alt="${comentDict.userName}"
    width="35" height="35">
    <p class="social__text">${comentDict.message}</p>`;
  return comment;
};

const commetsSection = (commentsDict) => {
  const comentsSection = fullPicture.querySelector('.social__comments');
  comentsSection.textContent = ' ';
  const commentsDictCopy = [...commentsDict];
  for (let i=0; i<5 && commentsDictCopy.length > 0; i++) {
    comentsSection.appendChild(generateComent(commentsDictCopy.shift()));
    socialComentShowCounter.textContent = i+1;
  }
  if(commentsDictCopy.length === 0){
    socialComentAddButton.classList.add('hidden');}
  else{socialComentAddButton.classList.remove('hidden');}
  socialComentAddButton.addEventListener('click', () =>{
    for (let i=0; i<5 && commentsDictCopy.length > 0; i++) {
      comentsSection.appendChild(generateComent(commentsDictCopy.shift()));
      socialComentShowCounter.textContent = parseInt(socialComentShowCounter.textContent, 10) + 1;
    }
    if(commentsDictCopy.length === 0){
      socialComentAddButton.classList.add('hidden');}
    else{socialComentAddButton.classList.remove('hidden');}
  });
};

function openUserModal(id) {
  const getPost = getTestPosts.find((item) => item.id === id);
  fullPicture.querySelector('img').src = getPost.url;
  fullPicture.querySelector('.likes-count').textContent = getPost.likes;
  fullPicture.querySelector('.comments-count').textContent = getPost.comments.length;
  fullPicture.querySelector('.social__caption').textContent = getPost.description;
  commetsSection(getPost.comments);
  document.body.classList.add('modal-open');
  fullPicture.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscKeydown);
}

function closeUserModal() {
  document.querySelector('body').classList.remove('modal-open');
  fullPicture.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
}

userModalOpenPictures.forEach((userModalOpenPicture) => {
  userModalOpenPicture.addEventListener('click', () => {
    openUserModal(userModalOpenPicture.id);
  });
  userModalOpenPicture.addEventListener('keydown', (evt) => {
    if (isEnterKey(evt)) {
      openUserModal(userModalOpenPicture.id);
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
