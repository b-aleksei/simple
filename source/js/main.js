document.addEventListener('alpine:init', () => {
  // eslint-disable-next-line no-undef
  Alpine.store('tabs', {
    current: 'first',
    items: ['first', 'second', 'third'],
  });
  // eslint-disable-next-line no-undef
  Alpine.data('post', () => ({
    posts: [],
    postLimit: 10,
    increasePosts: 10,
    url: 'https://jsonplaceholder.typicode.com/posts/',
    get showPosts() {
      return this.posts.slice(0, this.postLimit);
    },
    addPosts() {
      this.postLimit += this.increasePosts;
    },
  }));
});

