'use strict';

/**
 * Hotelasset.js controller
 *
 * @description: A set of functions called "actions" for managing `Hotelasset`.
 */

module.exports = {

  /**
   * Retrieve hotelasset records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.hotelasset.search(ctx.query);
    } else {
      return strapi.services.hotelasset.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a hotelasset record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.hotelasset.fetch(ctx.params);
  },

  /**
   * Count hotelasset records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.hotelasset.count(ctx.query);
  },

  /**
   * Create a/an hotelasset record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.hotelasset.add(ctx.request.body);
  },

  /**
   * Update a/an hotelasset record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.hotelasset.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an hotelasset record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.hotelasset.remove(ctx.params);
  }
};
