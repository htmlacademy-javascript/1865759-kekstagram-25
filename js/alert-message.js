import { isEscapeKey } from './util.js';

const errorLoadMesageTemplate = document.querySelector('#error-load').content;
const successMessageTemplate = document.querySelector('#success').content;
const errorUploadMesageTemplate = document.querySelector('#error').content;
let errorContainer;
let successContainer;

const onLoadEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    document.removeEventListener('keydown', onLoadEscKeydown);
  }
};

const removeLoadMessage = () => {
  successContainer.remove();
  document.removeEventListener('keydown', onLoadEscKeydown);
};

const loadError = (err) => {
  const errorMesage = errorLoadMesageTemplate.cloneNode(true);
  errorMesage.querySelector('span').textContent = err;
  document.body.insertBefore(errorMesage, document.body.firstChild);
};

const uploadMessage =  () => {
  const message = successMessageTemplate.cloneNode(true);
  successContainer = message.querySelector('.success');
  message.querySelector('.success__button').addEventListener('click', ()=>{
    successContainer.remove();
  });
  document.addEventListener('keydown', onLoadEscKeydown);
  successContainer.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget || evt.target.closest('.success__button')){
      evt.preventDefault();
      successContainer.remove();
      removeLoadMessage();
    }
  });
  document.body.append(message);
};

const onErrorEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    successContainer.remove();
    document.removeEventListener('keydown', onErrorEscKeydown);
  }
};

const removeModalErrorListeners = () => {
  document.removeEventListener('keydown', onErrorEscKeydown);
};

const removeErrorMessage = () => {
  successContainer.remove();
  removeModalErrorListeners();
};

const uploadError = (err) => {
  const message = errorUploadMesageTemplate.cloneNode(true);
  errorContainer = message.querySelector('.error');
  errorContainer.querySelector('.error__title').textContent = `Ошибка загрузки файла ${err}`;
  message.querySelector('.error__button').addEventListener('click', ()=>{
    errorContainer.remove();
  });
  document.addEventListener('keydown', onErrorEscKeydown);
  errorContainer.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget || evt.target.closest('.success__button')){
      evt.preventDefault();
      errorContainer.remove();
      removeErrorMessage();
    }
  });
  document.body.append(message);
};

export { loadError, uploadMessage, uploadError };
