import {getTestPost} from './get-post.js';
const getTestPosts =  Array.from({length: 25}, (v,i) => getTestPost(i+1));

// eslint-disable-next-line no-console
console.log(getTestPosts);
