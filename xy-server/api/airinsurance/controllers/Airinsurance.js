'use strict';

/**
 * Airinsurance.js controller
 *
 * @description: A set of functions called "actions" for managing `Airinsurance`.
 */

module.exports = {

  /**
   * Retrieve airinsurance records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.airinsurance.search(ctx.query);
    } else {
      return strapi.services.airinsurance.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a airinsurance record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.airinsurance.fetch(ctx.params);
  },

  /**
   * Count airinsurance records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.airinsurance.count(ctx.query);
  },

  /**
   * Create a/an airinsurance record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.airinsurance.add(ctx.request.body);
  },

  /**
   * Update a/an airinsurance record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.airinsurance.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an airinsurance record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.airinsurance.remove(ctx.params);
  }
};
