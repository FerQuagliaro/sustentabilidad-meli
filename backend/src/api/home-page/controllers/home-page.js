'use strict';

/**
 *  home-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController(
  'api::home-page.home-page',
  ({ strapi }) => ({
    async find(ctx) {
      const where = {};

      if (ctx.query._locale) where.locale = ctx.query._locale;

      const entity = await strapi.db.query('api::home-page.home-page').findOne({
        where,
        populate: {
          videoHero: {
            populate: {
              video: {
                select: ['url', 'size'],
              },
            },
          },
          stakeholders: {
            select: [
              'overTitle',
              'description',
              'btnText',
              'featuredProjectsTitle',
            ],
            populate: {
              related: {
                select: ['title', 'slug', 'theme'],
                populate: {
                  hero: {
                    select: ['title'],
                  },
                  image: {
                    select: ['url', 'width', 'height', 'alternativeText'],
                  },
                },
              },
              items: '*',
              projects: '*',
            },
          },
          ourGoals: {
            populate: {
              items: {
                select: ['id', 'title'],
                populate: {
                  image: {
                    select: ['url', 'width', 'height', 'alternativeText'],
                  },
                },
              },
            },
          },
          quoteSection: {
            populate: {
              audio: {
                select: ['url', 'ext', 'mime', 'size'],
              },
              avatar: {
                select: ['url', 'width', 'height', 'alternativeText'],
              },
            },
          },
          giganticText: {
            populate: {
              lines: '*',
            },
          },
          lastPublications: {
            populate: {
              items: {
                select: ['title'],
                populate: {
                  file: {
                    select: ['url'],
                  },
                },
              },
            },
          },
          lastPosts: true,
        },
      });

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    },
  })
);
