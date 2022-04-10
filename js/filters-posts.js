import { getPosts } from './get-post.js';
import { renderPosts } from './picture.js';
import { debounce } from './util.js';
import { RERENDER_DELAY } from './data.js';


const imgFilters = document.querySelector('.img-filters');
const filterBtnDefault = document.querySelector('#filter-default');
const filterBtnRandom = document.querySelector('#filter-random');
const filterBtnDiscussed = document.querySelector('#filter-discussed');

const setActiveBtn = (activeBtn) => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  activeBtn.classList.add('img-filters__button--active');
};

const clearPosts = () => {
  const postsList = document.querySelectorAll('.picture');
  postsList.forEach((picture) => {
    picture.remove();
  });
};

const getDefaultPosts = () => getPosts().sort((post1, post2) => post1.id - post2.id);

const getShuflePosts = () => getPosts().sort(() => .5 - Math.random()).slice(0,10) ;

const getDiscussedPosts = () => getPosts().sort((post1, post2) => post1.comments.length - post2.comments.length);

const updatePosts = (posts) => {
  clearPosts();
  renderPosts(posts);
};

const debouncedPosts = debounce(updatePosts, RERENDER_DELAY);

const initFilters = () => {
  imgFilters.classList.remove('img-filters--inactive');
  filterBtnDefault.addEventListener('click',(evt) => {
    setActiveBtn(evt.target);
    debouncedPosts(getDefaultPosts());
  });
  filterBtnRandom.addEventListener('click',(evt) => {
    setActiveBtn(evt.target);
    debouncedPosts(getShuflePosts());
  });
  filterBtnDiscussed.addEventListener('click', (evt) => {
    setActiveBtn(evt.target);
    debouncedPosts(getDiscussedPosts());
  });
};

export{ initFilters };
