'use strict';

/**
 *  header controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::header.header', ({ strapi }) => ({
  async find(ctx) {
    const where = {};

    if (ctx.query._locale) where.locale = ctx.query._locale;

    const entity = await strapi.db.query('api::header.header').findOne({
      where,
      populate: {
        logo: {
          select: ['url', 'width', 'height', 'alternativeText'],
        },
        navbar: {
          populate: {
            items: '*',
          },
        },
        btnDownload: {
          select: ['text'],
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
}));
