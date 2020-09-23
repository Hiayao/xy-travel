'use strict';

/**
 * Postkind.js controller
 *
 * @description: A set of functions called "actions" for managing `Postkind`.
 */

module.exports = {

  /**
   * Retrieve postkind records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
      return strapi.models.postkind.fetchAll();
  },

  /**
   * Retrieve a postkind record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.postkind.fetch(ctx.params);
  },

  /**
   * Count postkind records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.postkind.count(ctx.query);
  },

  /**
   * Create a/an postkind record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.postkind.add(ctx.request.body);
  },

  /**
   * Update a/an postkind record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.postkind.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an postkind record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.postkind.remove(ctx.params);
  }
};
