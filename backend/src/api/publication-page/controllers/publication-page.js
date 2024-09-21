'use strict';

/**
 *  publication-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController(
  'api::publication-page.publication-page',
  ({ strapi }) => ({
    async find(ctx) {
      const where = {};
      if (ctx.query.locale) where.locale = ctx.query.locale;

      const entity = await strapi.db
        .query('api::publication-page.publication-page')
        .findOne({
          where,
          populate: {
            hero: true,
            featured: {
              populate: {
                publications: {
                  select: ['title'],
                  populate: {
                    file: {
                      select: ['url'],
                    },
                    tag: {
                      select: ['name'],
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
