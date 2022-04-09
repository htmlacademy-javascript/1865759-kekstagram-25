import { initPosts } from './get-post.js';
import { renderPosts } from './picture.js';
import './form.js';
import './filters-picture.js';
import { getPostData } from './api.js';
import { loadError } from './alert-message.js';

getPostData((posts) => {
  renderPosts(posts);
  initPosts(posts);
},loadError);
