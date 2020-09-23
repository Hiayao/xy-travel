'use strict';

/**
 * Hotel.js controller
 *
 * @description: A set of functions called "actions" for managing `Hotel`.
 */

const _ = require('lodash');

module.exports = {

  comments: async ctx => {
    //const data = await strapi.models.comment.where(ctx.query).fetchAll();
    // type: 1 表示查找酒店的评论
    ctx.query = {...ctx.query, level_contains: 1, type: 1}

    const comments = await strapi.services.comment.fetchAll(ctx.query);
    const total = await strapi.services.comment.count(ctx.query);

    const data = comments.toJSON().map(v => {
      v.hotel = v.hotel.id;
      return v;
    });

    return {
      data,
      total
    }
  },

  options: async ctx => {
    const levels = await strapi.models.hotellevel.fetchAll();
    const types = await strapi.models.hoteltype.fetchAll();
    const assets = await strapi.models.hotelasset.fetchAll();
    const brands = await strapi.models.hotelbrand.fetchAll();

    return {
      data: {
        levels,
        types,
        assets,
        brands
      }
    }

  },


  /**
   * Retrieve hotel records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {

    const {enterTime, leftTime, /*scenic, hotelasset, */_limit, _start, ...others} = ctx.query;
    const linkParmas = {} // 连表查询的参数
    const props = _.omitBy(others, (v, k) => {
      const matchs = k.match(/(scenic|hotelasset)(_\w+)?/)
      if (matchs) {
        linkParmas[matchs[1]] = Array.isArray(v) ? v : [v]
        return true
      }
    })
    const {scenic, hotelasset} = linkParmas

    // find hotels
    // 不连表查询
    // const res = await strapi.models.hotel.fetchAll(props);
    // 连表查询

    const defaultProps = {
      ...props,
      _limit: _limit ? +_limit : 10,
      _start: _start ? +_start : 0
    };

    let res = {};

    if( (scenic || hotelasset )  && !ctx.query.id ){
      let hotels = await strapi.services.hotel.fetchAll(props);
      hotels = hotels.toJSON();

      const _hotels = hotels.filter(v => {
        const {
          scenic: scenics,
          hotelassets
        } = v;
        let condition = {};
        let _condition = 0;

        // 只要酒店属于这个景点，则返回true
        if(scenic && scenics){
          condition.scenic = 0;
          scenics.forEach(item => {
            if(scenic.includes(item.id.toString())){
              condition.scenic = 1;
            }
          });
        }

        if(hotelasset && hotelassets){
          condition.hotelasset = 0;
          hotelassets.forEach(item => {
            if(hotelasset.includes(item.id.toString())){
              condition.hotelasset = 1;
            }
          });
        }

        // 对象判断逻辑
        Object.keys(condition).forEach(v => {
          const item = condition[v];
          _condition += item;
        })

        return _condition == Object.keys(condition).length;
      })

      res = {
        data: _hotels.slice(defaultProps._start, defaultProps._start + defaultProps._limit),
        total: _hotels.length,
      }
    }else{
      const hotels = await strapi.services.hotel.fetchAll(defaultProps);
      let total
      try {
        total = await strapi.services.hotel.count(props);
      } catch(e) {
        const all = await strapi.services.hotel.fetchAll(props);
        total = all.toJSON().length
      }

      res = {
        data: hotels.toJSON(),
        total,
      }
    }

    // 去除不需要的属性
    res.data = res.data.map(v => {
      const {comments, ...props} = v;
      props.products = [
        {
          name: "携程",
          price: parseInt(v.price + _.random(1, 100, true), 10),
          bestType: '高级大床房A',
        },
        {
          name: "艺龙",
          price: parseInt(v.price + _.random(1, 100, true), 10),
          bestType: '高级大床房A',
        },
        {
          name: "Hotels.com",
          price: parseInt(v.price + _.random(1, 100, true), 10),
          bestType: '高级大床房A',
        }
      ]
      return props;
    });

    return {
      ...res,
      nextStart: props.id ? 0 : defaultProps._start + defaultProps._limit
    }
  },

  /**
   * Retrieve a hotel record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.hotel.fetch(ctx.params);
  },

  /**
   * Count hotel records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.hotel.count(ctx.query);
  },

  /**
   * Create a/an hotel record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.hotel.add(ctx.request.body);
  },

  /**
   * Update a/an hotel record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.hotel.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an hotel record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.hotel.remove(ctx.params);
  }
};
