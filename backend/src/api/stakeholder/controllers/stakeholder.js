'use strict';

/**
 *  stakeholder controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController(
  'api::stakeholder.stakeholder',
  ({ strapi }) => ({
    async findOneBySlug(ctx) {
      const { slug } = ctx.params;
      const where = { slug };

      if (ctx.query._locale) where.locale = ctx.query._locale;

      const entity = await strapi.db
        .query('api::stakeholder.stakeholder')
        .findOne({
          where,
          populate: {
            hero: {
              select: ['title', 'overTitle'],
            },
            image: {
              select: ['url', 'width', 'height', 'alternativeText'],
            },
            actWhere: { populate: true },
            importantNumbers: {
              populate: {
                image: {
                  select: ['url', 'width', 'height', 'alternativeText'],
                },
                numbers: true,
              },
            },
            quoteSlider: {
              populate: {
                items: {
                  populate: {
                    imageLarge: {
                      select: ['url', 'width', 'height', 'alternativeText'],
                    },
                    imageSmall: {
                      select: ['url', 'width', 'height', 'alternativeText'],
                    },
                  },
                },
              },
            },
            quoteSlider: {
              populate: {
                items: {
                  populate: {
                    imageLarge: {
                      select: ['url', 'width', 'height', 'alternativeText'],
                    },
                    imageSmall: {
                      select: ['url', 'width', 'height', 'alternativeText'],
                    },
                  },
                },
              },
            },
            moreStakeholders: { populate: true },
            projects: {
              populate: {
                items: {
                  populate: {
                    thumb: {
                      select: ['url', 'width', 'height', 'alternativeText'],
                    },
                  },
                },
              },
            },
            localizations: {
              select: ['id', 'slug', 'locale'],
            },
          },
        });

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    },
  })
);
