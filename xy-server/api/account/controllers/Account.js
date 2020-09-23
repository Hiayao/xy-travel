'use strict';

/**
 * Account.js controller
 *
 * @description: A set of functions called "actions" for managing `Account`.
 *
 * note:  plugins\users-permissions\config\policies\permissions.js  #16
 *        在把user替换为account
 */

 const _ = require('lodash');

/**
 * verify is the mobile phone number?
 *
 * @return Boolean; true is sure;
 */
const isMobile = (number) => {
  const reg=/^[1][3,4,5,7,8][0-9]{9}$/;

  if (!number || !reg.test(number) ){
    return false;
  }
  return true;
}

module.exports = {

  /**
  * user login 
  *
  * @params {
  *   username:   String
  *   password:   String
  * } 
  *
  * #return {user}
  */

  login: async ctx => {

    // present only support phone number
    const params = {
      username: "",
      password: "",
      ...ctx.request.body
    }

    // params required
    let errMsg = ""
    Object.keys(params).forEach(v => {
      if(!params[v] && !errMsg){
        errMsg = `Please provide your ${v}`;
      }
    })

    if(errMsg) return ctx.badRequest(null, errMsg);

    // fetch user
    const user = await strapi.models.account.where(params).fetch();

    if(!user){
      return ctx.badRequest(null, '用户名或者密码无效.');
    }

    if (user.role.type !== 'root' && ctx.request.admin) {
      return ctx.badRequest(null, ctx.request.admin ? [{ messages: [{ id: 'Auth.form.error.noAdminAccess' }] }] : `You're not an administrator.`);
    }

    ctx.send({
      token: strapi.plugins['users-permissions'].services.jwt.issue(_.pick(user.toJSON ? user.toJSON() : user, ['_id', 'id'])),
      user: _.omit(user.toJSON ? user.toJSON() : user, ['password', 'resetPasswordToken'])
    });
  },

  /**
   * custom register by phone verify
   *
   * @params {
   *  username:   String
   *  nickname:   String
   *  captcha:    String | Number
   *  passowrd:   String>
   * }
   }
   * @return {}
   */

  register: async (ctx) => {

    // get plugin of 'users-permissions'
    const pluginStore = await strapi.store({
      environment: "",
      type: 'plugin',
      name: 'users-permissions'
    });

    const settings = await pluginStore.get({
      key: 'advanced'
    });

    // not allow reigster
    if (!settings.allow_register) {
      return ctx.badRequest(null, ctx.request.admin ? [{ messages: [{ id: 'Auth.advanced.allow_register' }] }] : 'Register action is currently disabled.');
    }

    // present only support phone number
    const params = {
      username: "",
      nickname: "",
      captcha: "",
      password: "",
      ...ctx.request.body
    }

    // params required
    let errMsg = ""
    Object.keys(params).forEach(v => {
      if(!params[v] && !errMsg){
        errMsg = `Please provide your ${v}`;
      }
    })

    if(errMsg) return ctx.badRequest(null, errMsg);

    // is mobile number
    if(!isMobile(params.username)){
      return ctx.badRequest(null, '手机号码格式错误');
    }

    const role = await strapi.plugins['users-permissions'].models.role.forge({ type: settings.default_role  }).fetch();

    if (!role) {
      // 用户角色错误 
      return ctx.badRequest(null, '用户注册失败');
    }

    params.role = role._id || role.id;
    params.defaultAvatar = "/assets/images/avatar.jpg";

    // find account
    const {captcha, ...paramsProps} = params;

    const account = await strapi.models.account.where(paramsProps).fetch();

    if(account){
      return ctx.badRequest(null, '用户名已经存在');
    }

    // match captcha
    const captchaCount = await strapi.services.captcha.count({ 
      tel: params.username, 
      code: captcha, 
      // isValid: true
    });

    if(!captchaCount){
      return ctx.badRequest(null, '手机验证码错误.');
    }

    try{
      const _user = await strapi.services.account.add(paramsProps);
      const user = await strapi.models.account.where({id: _user.toJSON().id}).fetch();

      const token = strapi.plugins['users-permissions'].services.jwt.issue(
        _.pick(user.toJSON ? user.toJSON() : user, ['_id', 'id'])
      );

      ctx.send({
        token,
        user: _.omit(user.toJSON ? user.toJSON() : user, ['password', 'resetPasswordToken'])
      });

    }catch(err){
      ctx.badRequest(null, '注册失败');
    }
  },

  /**
   * Retrieve account records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.account.search(ctx.query);
    } else {
      return strapi.services.account.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a account record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.account.fetch(ctx.params);
  },

  /**
   * Count account records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.account.count(ctx.query);
  },

  /**
   * Create a/an account record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.account.add(ctx.request.body);
  },

  /**
   * Update a/an account record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.account.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an account record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.account.remove(ctx.params);
  }
};
