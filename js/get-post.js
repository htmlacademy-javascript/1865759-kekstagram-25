let cards = [];

const initPosts = (newCards) => {
  cards = newCards;
};

const getPosts = () => cards;

export { getPosts, initPosts };
