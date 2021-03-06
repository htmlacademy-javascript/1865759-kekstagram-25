import { initFilters } from './filters-posts.js';

const getPostData = (onSuccess,onError) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);})
    .then((posts) => {
      onSuccess(posts);
    })
    .then(()=>{
      initFilters();
    })
    .catch((err) => {
      onError(err);
    });
};
const sendNewPost = (onSuccess, onError, body) => {
  fetch('https://25.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body
    })
    .then((response) => {
      if (response.ok) {
        return onSuccess();
      }
      throw new Error(`${response.status} ${response.statusText}`);})
    .catch((err) => {
      onError(err);
    });
};
export {getPostData, sendNewPost};
