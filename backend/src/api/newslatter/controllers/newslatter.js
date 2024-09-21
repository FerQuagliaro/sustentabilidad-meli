'use strict';

/**
 *  newslatter controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController(
  'api::newslatter.newslatter',
  ({ strapi }) => ({
    async find(ctx) {
      const where = {};

      if (ctx.query._locale) where.locale = ctx.query._locale;

      const entity = await strapi.db
        .query('api::newslatter.newslatter')
        .findOne({
          where,
          populate: [
            'nameInput',
            'emailInput',
            'selectInput',
            'termsInput',
            'selectOptions',
            'success',
            'error',
          ],
        });

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    },
  })
);
