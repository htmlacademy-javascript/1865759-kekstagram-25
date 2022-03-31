import { isEscapeKey } from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadOverlayForm = uploadForm.querySelector('.img-upload__overlay');
const uploadOverlayCloseForm = uploadForm.querySelector('.img-upload__cancel');
const imgUploadPreview = uploadForm.querySelector('.img-upload__preview').querySelector('img');
const uploadTextDescription = uploadForm.querySelector('.text__description');
const uploadTexthashtags = uploadForm.querySelector('.text__hashtags');

const pristine = new Pristine(uploadForm,  {
  classTo: 'form__item',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'form__item',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

const validateDescription = (textDescription) => textDescription.length <= 140;

const validateHashtags = (textHashtags) => {
  const arrayHashtags = textHashtags.split(' ');
  const re = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;
  return arrayHashtags.length === arrayHashtags.filter((hashTag) => re.test(hashTag)).length;
};

pristine.addValidator(uploadTextDescription,validateDescription,'До 140 симолов!');
pristine.addValidator(uploadTexthashtags,validateHashtags,'Условия xэш-тегов!');

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const onFormEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFormModal();
  }
};

function closeFormModal() {
  document.body.classList.remove('modal-open');
  uploadOverlayForm.classList.add('hidden');
  document.removeEventListener('keydown', onFormEscKeydown);
}

uploadFile.addEventListener('change', () => {
  document.body.classList.add('modal-open');
  uploadOverlayForm.classList.remove('hidden');
  imgUploadPreview.src = URL.createObjectURL(uploadFile.files[0]);
  document.addEventListener('keydown', onFormEscKeydown);
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

