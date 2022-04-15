import { isEscapeKey } from './util.js';
import { resetScale } from './scale-picture.js';
import { resetFilter } from './filters-picture.js';
import { sendNewPost } from './api.js';
import { uploadMessage, uploadError } from './alert-message.js';
import { openModal, closeModal } from './modal-views.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadOverlayForm = uploadForm.querySelector('.img-upload__overlay');
const uploadOverlayCloseForm = uploadForm.querySelector('.img-upload__cancel');
const imgUploadPreview = uploadForm.querySelector('.img-upload__preview img');
const uploadTextDescription = uploadForm.querySelector('.text__description');
const uploadTexthashtags = uploadForm.querySelector('.text__hashtags');
const imgUploadPreviewEffects = uploadForm.querySelectorAll('.effects__preview');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const disableSubmitButton = () => {
  submitButton.disabled = true;
};

const enableSubmitButton = () => {
  submitButton.disabled = false;
};

const pristine = new Pristine(uploadForm,  {
  classTo: 'form__item',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'form__item',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

const validateDescription = (textDescription) => textDescription.length <= 140;

const hashtagsToArray = (hashtags) => hashtags
  .split(' ')
  .map((hashtag) => hashtag.toLowerCase())
  .filter((hashtag) => hashtag !== '');

const validateHashtags = (textHashtags) => {
  const arrayHashtags = hashtagsToArray(textHashtags);
  const re = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;
  return arrayHashtags.length === arrayHashtags.filter((hashTag) => re.test(hashTag)).length || textHashtags.length === 0;
};

const validateHashtagsLenght = (textHashtags) => {
  const arrayHashtags = hashtagsToArray(textHashtags);
  return arrayHashtags.length < 6;
};

const validateHashtagsDublicate = (textHashtags) => {
  const arrayHashtags = hashtagsToArray(textHashtags);
  return 0  === arrayHashtags.filter((item, index) => arrayHashtags.indexOf(item) !== index).length;
};

pristine.addValidator(uploadTextDescription,validateDescription,'Комментарий до 140 симолов!');
pristine.addValidator(uploadTexthashtags,validateHashtags,'Xэш-тег должен начинатся с # и не больше 20 символов!');
pristine.addValidator(uploadTexthashtags,validateHashtagsLenght,'Количество xэш-тегов не должно быть больше 5!');
pristine.addValidator(uploadTexthashtags,validateHashtagsDublicate,'Одинаковые хэш-теги!');

const onFormEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal(onFormEscKeydown,uploadOverlayForm);
    uploadForm.reset();
    pristine.reset();
  }
};

const closeFormModal = () => {
  closeModal(onFormEscKeydown,uploadOverlayForm);
  uploadForm.reset();
  pristine.reset();
};

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()){
    disableSubmitButton();
    sendNewPost(
      () => {
        enableSubmitButton();
        closeFormModal();
        uploadMessage();
      },
      () => {
        enableSubmitButton();
        closeFormModal();
        uploadError();
      },
      new FormData(evt.target)
    );
  }
});

uploadFile.addEventListener('change', () => {
  openModal(onFormEscKeydown,uploadOverlayForm);
  imgUploadPreview.src = URL.createObjectURL(uploadFile.files[0]);
  imgUploadPreviewEffects.forEach((image) => {
    image.style.backgroundImage = `url(${imgUploadPreview.src})`;
  });
  resetScale();
  resetFilter();
});

uploadOverlayCloseForm.addEventListener('click',closeFormModal);

uploadTextDescription.addEventListener('focus',() => {
  document.removeEventListener('keydown', onFormEscKeydown);
});

uploadTextDescription.addEventListener('blur',() => {
  document.addEventListener('keydown', onFormEscKeydown);
});

uploadTexthashtags.addEventListener('focus',() => {
  document.removeEventListener('keydown', onFormEscKeydown);
});

uploadTexthashtags.addEventListener('blur',() => {
  document.addEventListener('keydown', onFormEscKeydown);
});

