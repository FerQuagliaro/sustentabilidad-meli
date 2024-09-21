'use strict';

/**
 *  publication-section controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController(
  'api::publication-section.publication-section',
  ({ strapi }) => ({
    async find(ctx) {
      const where = {};
      if (ctx.query._locale) where.locale = ctx.query._locale;

      const entity = await strapi.db
        .query('api::publication-section.publication-section')
        .findOne({
          where,
          select: ['title', 'description', 'btnText'],
          populate: {
            publication: {
              select: ['title'],
              populate: {
                file: {
                  select: ['url'],
                },
              },
            },
          },
        });
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    },
  })
);
