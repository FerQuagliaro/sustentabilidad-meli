'use strict';

/**
 *  post controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const findLastIndex = require('lodash/findLastIndex');

const isUniqueSection = (name) => {
  const sections = ['projects.quote'];
  return sections.includes(name);
};

const mapComponents = (items) => {
  if (!items) return [];
  return items.reduce((acc, { sectionTitle, ...item }) => {
    if (isUniqueSection(item.__component)) {
      acc.push({
        name: sectionTitle,
        unique: true,
        ...item,
      });
      return acc;
    }
    if (sectionTitle) {
      acc.push({
        id: item.id,
        name: sectionTitle,
        unique: false,
        __component: item.__component,
        components: [{ ...item }],
      });
      return acc;
    }
    const index = findLastIndex(acc, ['unique', false]);

    acc[index].components.push({ ...item });

    return acc;
  }, []);
};

module.exports = createCoreController('api::post.post', ({ strapi }) => ({
  async findOneBySlug(ctx) {
    const { slug } = ctx.params;
    const where = { slug };

    if (ctx.query.locale) where.locale = ctx.query.locale;

    const entity = await strapi.db.query('api::post.post').findOne({
      where,
      populate: {
        hero: {
          populate: {
            image: {
              select: ['url', 'width', 'height', 'alternativeText'],
            },
          },
        },
        sections: {
          populate: {
            paragraphs: {
              populate: true,
            },
            images: {
              select: ['url', 'width', 'height', 'alternativeText'],
            },
            image: {
              select: ['url', 'width', 'height', 'alternativeText'],
            },
            logo: {
              select: ['url', 'width', 'height', 'alternativeText'],
            },
            items: {
              populate: true,
            },
            links: {
              populate: true,
            },
          },
        },
        localizations: {
          select: ['id', 'slug', 'locale'],
        },
      },
    });

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    const res = this.transformResponse(sanitizedEntity);

    if (!res) return;

    return {
      data: {
        ...res.data,
        attributes: {
          ...res.data.attributes,
          sections: mapComponents(res.data.attributes.sections),
        },
      },
    };
  },
}));
