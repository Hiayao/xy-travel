'use strict';

/**
 * Post.js controller
 *
 * @description: A set of functions called "actions" for managing `Post`.
 */

 // 获取图片
let imgReg = /<img.*?(?:>|\/>)/gi;
let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;

async function getCommentByFollow(comment){
    let {followed, post, hotel, ...props} = comment;

    if(comment.follow && comment.follow.id){
      const _cmt = await strapi.services.comment.fetch({id: comment.follow.id});
      const cmt = _cmt.toJSON();
      props.parent = await getCommentByFollow(cmt);
    }
  return props;
}

module.exports = {
  cities: async ctx => {
    return {
      data: [
        {
          type: "热门城市",
          children: [
            {city: "北京", desc: "世界著名古都和现代化国际城市"},
            {city: "广州", desc: "粤港澳大湾区、泛珠江三角洲经济区"},
            {city: "上海", desc: "长江入海口，东隔东中国海"},
            {city: "成都", desc: "国家历史文化名城"},
            {city: "西安", desc: "中国国际形象最佳城市之一"}
          ]
        },
        {
          type: "推荐城市",
          children: [
            {city: "青岛", desc: "滨海度假旅游城市"},
            {city: "杭州", desc: "西湖十景"},
            {city: "深圳", desc: "世界影响力的创新创意之都"},
            {city: "广州", desc: "粤港澳大湾区、泛珠江三角洲经济区"},
            {city: "成都", desc: "国家历史文化名城"}
          ]
        },
        {
          type: "奔向海岛",
          children: [
            {city: "秦皇岛", desc: "驰名中外的旅游休闲胜地"},
            {city: "青岛", desc: "滨海度假旅游城市"},
            {city: "珠海", desc: "浪漫之城，百岛之市"},
            {city: "深圳", desc: "世界影响力的创新创意之都"},
            {city: "海口", desc: "海滨自然旖旎风光"}
          ]
        },
        {
          type: "主题推荐",
          children: [
            {city: "海口", desc: "海滨自然旖旎风光"},
            {city: "广州", desc: "粤港澳大湾区、泛珠江三角洲经济区"},
            {city: "上海", desc: "长江入海口，东隔东中国海"},
            {city: "珠海", desc: "浪漫之城，百岛之市"},
            {city: "西安", desc: "中国国际形象最佳城市之一"}
          ]
        }
      ]
    }
  },

  star: async ctx => {
    let { id: uid, starPosts } = ctx.state.user;
    const {id} = ctx.query;

    if(!starPosts) starPosts = [];

    if(!id){
      return ctx.badRequest(null, '请输入文章id');
    }

    if(starPosts.indexOf(id) > -1){
      return ctx.badRequest(null, '已收藏');
    }

    await strapi.services.account.edit({
      id: uid,
      starPosts: [...starPosts, id]
    });

    return {
      status: 0,
      message: "收藏成功"
    };
  },

  like: async ctx => {
    const { id: uid } = ctx.state.user;
    const {id} = ctx.query;

    if(!id){
      return ctx.badRequest(null, '必须提供文章id');
    }

    let res = await strapi.services.post.fetch({id});
    res = res.toJSON(); 

    if(!res.likeIds){
      res.likeIds = [];
    }

    if(res.likeIds.indexOf(uid) > -1){
      return ctx.badRequest(null, '用户已经点赞');
    }else{
      res.likeIds.push(uid);
    }

    const like = res.like + 1;

    await strapi.services.post.edit({
      id,
      like: like,
      likeIds: res.likeIds
    });

    return {
      status: 0,
      message: "点赞成功"
    }
  },

  comments: async ctx => {

    // 1.0 正常查找评论
    //const data = await strapi.models.comment.where(ctx.query).fetchAll();
    // type: 2 表示查找文章的评论
    // ctx.query = {...ctx.query, level_contains: 1, type: 2};

    // const comments = await strapi.services.comment.fetchAll(ctx.query);
    // const total = await strapi.services.comment.count(ctx.query);

    // const data = comments.toJSON().map(v => {
    //   v.post = v.post.id;
    //   return v;
    // });

    // 2.0 
    ctx.query = { _sort: "created_at:desc",...ctx.query, type: 2};
    const _res = await strapi.services.comment.fetchAll(ctx.query);
    const res = _res.toJSON().reverse();
    let data = [];

    for(let i = res.length, item; item = res[--i];){
        data.push(await getCommentByFollow(item));
    }

    // total
    const {_start, _limit, ...queryProps} = ctx.query;
    const _totalComments = await strapi.services.comment.fetchAll(queryProps);
    const total = _totalComments.toJSON().length;

    return {
      data,
      total
    }
  },

  /**
   * Retrieve post records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const {city} = ctx.query;
    let reg = new RegExp("[\\u4E00-\\u9FFF]+","g");

    if(reg.test(city)){
      const _city = await strapi.services.discity.fetchAll({name_contains: city})
      const cityData = _city.toJSON()[0];

      if(cityData){
        ctx.query.city = cityData.id;
      }
    }

    const _posts = await strapi.services.post.fetchAll(ctx.query);
    const posts = _posts.toJSON();

    const data = posts.map(v => ({
      ...v,
      summary: v.content.replace(/<\/?.+?>/g,""),
      images: v.content.match(imgReg) && 
              v.content.match(imgReg).map(img => img.match(srcReg)[1])
              || []
    }))

    // total
    const {_limit, _start, ...queryProps} = ctx.query;
    const _totalPosts = await strapi.services.post.fetchAll(queryProps);
    const total = _totalPosts.toJSON().length;

    return {
      data,
      total
    }
  },

  recommend: async ctx => {
    const _posts = await strapi.models.post.fetchAll({
      _start: 0,
      _limit: 5,
      _sort: "created_at:desc"
    });
    const posts = _posts.toJSON().reverse();

    if(posts.length > 5){
      posts.length = 5;
    }

    const data = posts.map(v => ({
      ...v,
      images: v.content.match(imgReg) && 
              v.content.match(imgReg).map(img => img.match(srcReg)[1])
              || []
    }))

    return {
      data
    }
  },

  /**
   * Retrieve a post record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    const _res = await strapi.services.post.fetch(ctx.params);
    const res = _res.toJSON();

    return await strapi.services.post.edit({
      id: res.id,
      watch: (res.watch || 0) + 1
    }) ;
  },

  /**
   * Count post records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.post.count(ctx.query);
  },

  /**
   * Create a/an post record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    if(!ctx.state.user){
      return ctx.badRequest(null, '当前用户未登陆');
    }

    const account = ctx.state.user.id;
    const {city, ...bodyProps} = ctx.request.body;
    let _city;

    if(typeof city === "string"){
      _city = await strapi.services.discity.fetchAll({name_contains: city})
    }

    if(typeof city === "number"){
      _city = await strapi.models.discity.where({id: city}).fetch();
    }

    let cityData = _city.toJSON();

    if(Array.isArray(cityData)){
      cityData = cityData[0];
    }

    if(!cityData){
      return ctx.badRequest(null, '请选择正确的城市名称');
    }

    const data = await strapi.services.post.add({
      ...bodyProps,
      account,
      city: cityData.id,
      cityName: cityData.name
    });

    return {
      status: 0,
      message: "新增成功",
      data
    };
  },



  /**
   * Update a/an post record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.post.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an post record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.post.remove(ctx.params);
  }
};
