'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/projects/slug/:slug',
      handler: 'project.findOneBySlug',
    },
  ],
};
