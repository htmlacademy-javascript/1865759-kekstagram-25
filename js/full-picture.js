import { isEscapeKey, isEnterKey } from './util.js';

const renderFullPicture = (posts) => {
  const fullPicture = document.querySelector('.big-picture');
  const userModalOpenPictures = document.querySelectorAll('.picture');
  const userModalClosePicture = fullPicture.querySelector('.big-picture__cancel');
  const socialCommentShowCounter = fullPicture.querySelector('.comments-show');
  const socialCommentAddButton = fullPicture.querySelector('.comments-loader');
  let handleAddCommentsButton;

  const onPopupEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      document.querySelector('body').classList.remove('modal-open');
      fullPicture.classList.add('hidden');
      document.removeEventListener('keydown', onPopupEscKeydown);
      socialCommentAddButton.removeEventListener('click', handleAddCommentsButton);
    }
  };

  const generateComment = (commentDict) => {
    const comment = document.createElement('li');
    comment.classList.add('social__comment');
    comment.innerHTML = `<img class="social__picture"
      src="${commentDict.avatar}"
      alt="${commentDict.name}"
      width="35" height="35">
      <p class="social__text">${commentDict.message}</p>`;
    return comment;
  };

  const renderMoreCommentsBtn = (commentsDictCopy) => {
    if (commentsDictCopy.length === 0) {
      socialCommentAddButton.classList.add('hidden');
    }
    else { socialCommentAddButton.classList.remove('hidden'); }
  };


  const renderCommetsSection = (commentsDict) => {
    const commentsSection = fullPicture.querySelector('.social__comments');
    commentsSection.textContent = ' ';
    socialCommentShowCounter.textContent = '0';
    const commentsDictCopy = [...commentsDict];
    for (let i = 0; i < 5 && commentsDictCopy.length > 0; i++) {
      commentsSection.appendChild(generateComment(commentsDictCopy.shift()));
      socialCommentShowCounter.textContent = i + 1;
    }
    renderMoreCommentsBtn(commentsDictCopy);
    handleAddCommentsButton = () => {
      for (let i = 0; i < 5 && commentsDictCopy.length > 0; i++) {
        commentsSection.appendChild(generateComment(commentsDictCopy.shift()));
        socialCommentShowCounter.textContent = parseInt(socialCommentShowCounter.textContent, 10) + 1;
      }
      renderMoreCommentsBtn(commentsDictCopy);
    };
    socialCommentAddButton.addEventListener('click', handleAddCommentsButton);
  };

  const openUserModal = (id) => {
    const getPost = posts.find((item) => parseInt(item.id, 10) === parseInt(id, 10));
    fullPicture.querySelector('img').src = getPost.url;
    fullPicture.querySelector('.likes-count').textContent = getPost.likes;
    fullPicture.querySelector('.comments-count').textContent = getPost.comments.length;
    fullPicture.querySelector('.social__caption').textContent = getPost.description;
    renderCommetsSection(getPost.comments);
    document.body.classList.add('modal-open');
    fullPicture.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscKeydown);
  };

  const closeUserModal = () => {
    document.querySelector('body').classList.remove('modal-open');
    fullPicture.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscKeydown);
    socialCommentAddButton.removeEventListener('click', handleAddCommentsButton);
  };

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
};
export {renderFullPicture};
