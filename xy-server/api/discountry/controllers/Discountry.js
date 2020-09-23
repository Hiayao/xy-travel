'use strict';

/**
 * Discountry.js controller
 *
 * @description: A set of functions called "actions" for managing `Discountry`.
 */

module.exports = {

  /**
   * Retrieve discountry records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.discountry.search(ctx.query);
    } else {
      return strapi.services.discountry.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a discountry record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.discountry.fetch(ctx.params);
  },

  /**
   * Count discountry records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.discountry.count(ctx.query);
  },

  /**
   * Create a/an discountry record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.discountry.add(ctx.request.body);
  },

  /**
   * Update a/an discountry record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.discountry.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an discountry record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.discountry.remove(ctx.params);
  }
};
