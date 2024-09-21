'use strict';

/**
 *  footer controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::footer.footer', ({ strapi }) => ({
  async find(ctx) {
    const where = {};

    if (ctx.query._locale) where.locale = ctx.query._locale;

    const entity = await strapi.db.query('api::footer.footer').findOne({
      where,
      select: ['title'],
      populate: {
        items: '*',
        rightItems: '*',
        bottom: {
          select: ['copy'],
          populate: {
            logo: {
              select: ['url', 'width', 'height', 'alternativeText'],
            },
            socials: '*',
            items: '*',
          },
        },
      },
    });
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));
