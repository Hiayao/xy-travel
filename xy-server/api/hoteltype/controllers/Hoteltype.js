'use strict';

/**
 * Hoteltype.js controller
 *
 * @description: A set of functions called "actions" for managing `Hoteltype`.
 */

module.exports = {

  /**
   * Retrieve hoteltype records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.hoteltype.search(ctx.query);
    } else {
      return strapi.services.hoteltype.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a hoteltype record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.hoteltype.fetch(ctx.params);
  },

  /**
   * Count hoteltype records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.hoteltype.count(ctx.query);
  },

  /**
   * Create a/an hoteltype record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.hoteltype.add(ctx.request.body);
  },

  /**
   * Update a/an hoteltype record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.hoteltype.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an hoteltype record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.hoteltype.remove(ctx.params);
  }
};
