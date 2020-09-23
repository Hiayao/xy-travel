'use strict';

/**
 * Disprovince.js controller
 *
 * @description: A set of functions called "actions" for managing `Disprovince`.
 */

module.exports = {

  /**
   * Retrieve disprovince records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.disprovince.search(ctx.query);
    } else {
      return strapi.services.disprovince.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a disprovince record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.disprovince.fetch(ctx.params);
  },

  /**
   * Count disprovince records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.disprovince.count(ctx.query);
  },

  /**
   * Create a/an disprovince record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.disprovince.add(ctx.request.body);
  },

  /**
   * Update a/an disprovince record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.disprovince.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an disprovince record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.disprovince.remove(ctx.params);
  }
};
