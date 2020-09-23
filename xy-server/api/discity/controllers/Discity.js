'use strict';

/**
 * Discity.js controller
 *
 * @description: A set of functions called "actions" for managing `Discity`.
 */

const _ = require('lodash');

module.exports = {

  /**
   * Retrieve discity records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {

    const {name} = ctx.query;
    const condition = {name_contains: name};

    // 模糊搜索不能使用strapi.models
    //const provinces = await strapi.services.disprovince.fetchAll(condition);
    const cities = await strapi.services.discity.fetchAll(condition);
    //const countries = await strapi.services.discountry.fetchAll(condition);

    //const res = [...provinces.toJSON(), ...cities.toJSON(), ...countries.toJSON()];
    const res = cities.toJSON();
    
    const data = res.map(v => {
      let { hotels, ...props} = v;
      return props;
    })

    ctx.body = {
      data,
      total: data.length
    };
  },

  /**
   * Retrieve a discity record.
   *
   * @return {Object}
   */

  search: async ctx => {
    const {id} = ctx.query;

    let _provinces = await strapi.models.disprovince.where({id}).fetch();
    let provinces = _provinces.toJSON();

    if(provinces){ 

        let cities = await strapi.models.discity.where({
          parentCode: provinces.code
        }).fetchAll();

        provinces.cities = cities.toJSON();
    }

    return { 
      data: provinces
    }
  },

  /**
   * Retrieve a discity record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.discity.fetch(ctx.params);
  },

  /**
   * Count discity records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.discity.count(ctx.query);
  },

  /**
   * Create a/an discity record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.discity.add(ctx.request.body);
  },

  /**
   * Update a/an discity record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.discity.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an discity record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.discity.remove(ctx.params);
  }
};
