'use strict';

/**
 *  blog-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController(
  'api::blog-page.blog-page',
  ({ strapi }) => ({
    async find(ctx) {
      const where = {};
      if (ctx.query.locale) where.locale = ctx.query.locale;

      const entity = await strapi.db.query('api::blog-page.blog-page').findOne({
        where,
        populate: {
          hero: {
            populate: {
              posts: {
                select: ['title', 'slug', 'createdAt', 'postDate'],
                populate: {
                  hero: {
                    select: ['excerpt'],
                  },
                  thumb: {
                    select: ['url', 'width', 'height', 'alternativeText'],
                  },
                },
              },
            },
          },
          search: true,
        },
      });

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    },
  })
);
