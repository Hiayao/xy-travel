'use strict';

/**
 * Hotellevel.js controller
 *
 * @description: A set of functions called "actions" for managing `Hotellevel`.
 */

module.exports = {

  /**
   * Retrieve hotellevel records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.hotellevel.search(ctx.query);
    } else {
      return strapi.services.hotellevel.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a hotellevel record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.hotellevel.fetch(ctx.params);
  },

  /**
   * Count hotellevel records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.hotellevel.count(ctx.query);
  },

  /**
   * Create a/an hotellevel record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.hotellevel.add(ctx.request.body);
  },

  /**
   * Update a/an hotellevel record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.hotellevel.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an hotellevel record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.hotellevel.remove(ctx.params);
  }
};
