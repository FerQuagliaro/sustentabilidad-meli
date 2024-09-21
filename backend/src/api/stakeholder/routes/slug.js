'use strict';

module.exports = {
  routes: [
    {
      // Path defined with a URL parameter
      method: 'GET',
      path: '/stakeholders/slug/:slug',
      handler: 'stakeholder.findOneBySlug',
    },
  ],
};
