'use strict';

/**
 * Captcha.js controller
 *
 * @description: A set of functions called "actions" for managing `Captcha`.
 */

const _ = require('lodash');
const fetch = require('node-fetch');
const querystring = require("querystring");

module.exports = {

  /**
   * Retrieve captcha records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.captcha.search(ctx.query);
    } else {
      return strapi.services.captcha.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a captcha record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.captcha.fetch(ctx.params);
  },

  /**
   * Count captcha records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.captcha.count(ctx.query);
  },

  /**
   * Create a/an captcha record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const {tel} = ctx.request.body;

    if(!tel){
      return ctx.badRequest(null, '请输入手机号码');
    }

    // check last captcha
    const validCount = await strapi.services.captcha.count({
      tel,
      isValid: true
    });

    if(validCount > 2){
      return ctx.badRequest(null, '访问次数过多，请稍后再试');
    }

    // verifition code
    const code = `000000`;

    // Because send message limitation ;
    // ----------------------------------------------------------------
    // const args = {
    //   mobile: tel,
    //   tpl_id: 105762,
    //   tpl_value: querystring.escape(`#code#=${code}`),
    //   key: `53cd364bc4ab2124bea90cba2bc04cbb`
    // }
    // const url = `http://v.juhe.cn/sms/send?${querystring.stringify(args)}`

    try{
      // const result = await fetch(url);
      // const res = await result.json();

      // if(res.error_code){
      //   return ctx.badRequest(null, 'Send captche error');
      // }
      // ----------------------------------------------------------------

      return strapi.services.captcha.add({
        tel,
        code
      }).then(res => {

        setTimeout(() => {
          // res.attributes == res.toJSON()
          strapi.services.captcha.edit({...res.attributes, isValid: false}) ;
        }, 20000)

        return res;
      });

    }catch(err){
      console.log(err)
      if(res.error_code){
        return ctx.badRequest(null, 'Please contact customer service');
      }
    } 
  },

  /**
   * Update a/an captcha record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.captcha.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an captcha record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.captcha.remove(ctx.params);
  }
};
