'use strict';

/**
 * Hotelbrand.js controller
 *
 * @description: A set of functions called "actions" for managing `Hotelbrand`.
 */

module.exports = {

  /**
   * Retrieve hotelbrand records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.hotelbrand.search(ctx.query);
    } else {
      return strapi.services.hotelbrand.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a hotelbrand record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.hotelbrand.fetch(ctx.params);
  },

  /**
   * Count hotelbrand records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.hotelbrand.count(ctx.query);
  },

  /**
   * Create a/an hotelbrand record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.hotelbrand.add(ctx.request.body);
  },

  /**
   * Update a/an hotelbrand record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.hotelbrand.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an hotelbrand record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.hotelbrand.remove(ctx.params);
  }
};
