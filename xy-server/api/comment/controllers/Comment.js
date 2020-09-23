'use strict';

/**
 * Comment.js controller
 *
 * @description: A set of functions called "actions" for managing `Comment`.
 */

module.exports = {

  like: async ctx => {
    const { id: uid } = ctx.state.user;
    const {id} = ctx.query;

    if(!id){
      return ctx.badRequest(null, '点赞失败，未找到该评论');
    }

    let res = await strapi.services.comment.fetch({id});
    res = res.toJSON(); 


    if(!res.likeIds){
      res.likeIds = [];
    }

    if(res.likeIds.indexOf(uid) > -1){
      return ctx.badRequest(null, '已经点赞');
    }else{
      res.likeIds.push(uid);
    }

    const like = res.like + 1;

    await strapi.services.comment.edit({
      id,
      like: like,
      likeIds: res.likeIds
    });

    return {
      status: 0,
      message: "点赞成功"
    }
  },

  /**
   * Retrieve comment records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.comment.search(ctx.query);
    } else {
      return strapi.services.comment.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a comment record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.comment.fetch(ctx.params);
  },

  /**
   * Count comment records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.comment.count(ctx.query);
  },

  /**
   * Create a/an comment record.
   *
   * @return {Object}
   * type = 1 is hotel and  = 2 is post
   */

  create: async (ctx) => {

    const {hotel: id, post: pid, score, follow} = ctx.request.body;

    ctx.request.body.account = ctx.state.user.id;
    ctx.request.body.level = 1;

    if(follow){
      const parent = await strapi.services.comment.fetch({id: follow});
      ctx.request.body.level = +parent.toJSON().level + 1;
    }

    if(id){
      ctx.request.body.type = 1;
      const hotel = await strapi.services.hotel.fetch({id});
      const data = hotel.toJSON();
      const scoreCache = {};

      if(!data.scores){
        data.scores = {
          all: 0,
          location: 0,
          service: 0,
          fancility: 0
        };
      }

      const commentTotal = data.comments.length;

      /**
        (4.4+4+4.6+4.2+4.9) / 5 = 4.42
        (4.4+4+4.6+4.2) / 4 = 4.3
        (4.9-4.3) / 5 = 0.12
        (4.9-4.3) / 5 + 4.3 = 4.42
      */
      if(score && score.all){
        scoreCache.all = (score.all - data.scores.all) / commentTotal + data.scores.all;
      }
      if(score && score.location){
        scoreCache.location = (score.location - data.scores.location) / commentTotal + data.scores.location;
      }
      if(score && score.service){
        scoreCache.service = (score.service - data.scores.service) / commentTotal + data.scores.service;
      }
      if(score && score.fancility){
        scoreCache.fancility = (score.fancility - data.scores.fancility) / commentTotal + data.scores.fancility;
      }

      await strapi.services.hotel.edit({
        id,
        scores: {
          ...data.scores,
          ...scoreCache
        }
      }) ;
    }

    if(pid){
      ctx.request.body.type = 2;
    }

    try{
      await strapi.services.comment.add(ctx.request.body);
      return {
        status: 0,
        message: "提交成功"
      }
    }catch(err){
      return badRequest(null, err.response);
    }
  },

  /**
   * Update a/an comment record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.comment.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an comment record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.comment.remove(ctx.params);
  }
};
