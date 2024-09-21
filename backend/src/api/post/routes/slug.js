'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/posts/slug/:slug',
      handler: 'post.findOneBySlug',
    },
  ],
};
