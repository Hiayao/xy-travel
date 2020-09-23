'use strict';

/**
 * Airorder.js controller
 *
 * @description: A set of functions called "actions" for managing `Airorder`.
 */

const fetch = require('node-fetch');
const request = require('request');


// 微信支付appid partner商户id ，partnerkey：秘钥 
// 支付帮助文档：https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=6_1
const payConfig = {
  appid: 'wx8397f8696b538317',    
  partner: '1473426802',    
  partnerkey: "T6m9iK73b0kn9g5v426MKfHQH7X8rKwb", 
  notify_url: 'http://wxapi.gz.itcast.cn/WeChatPay/WeChatPayNotify'
}

function getxmlnodevalue(node_name,xml){
    var tmp = xml.split("<" + node_name + ">");
    var _tmp = tmp[1].split("</" + node_name + ">");
    var _tmp1 = _tmp[0].split('[');
    var res = _tmp1[2].split(']');
    return res[0];  
}

//随机生成字符串
function randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var string = '';
    for (var i = 0; i < len; i++) {
      string += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return string;
}

//微信支付验证算法
function paysignapi(ret) {
    var string = raw(ret);
    var key = payConfig.partnerkey;
    string = string + '&key=' + key;
    var crypto = require('crypto');
    return crypto.createHash('md5').update(string, 'utf8').digest('hex');
};

//对象排序
function raw(args) {
    var keys = Object.keys(args);
    keys = keys.sort()
    var newArgs = {};
    keys.forEach(function (key) {
      newArgs[key] = args[key];
    });
    var string = '';
    for (var k in newArgs) {
      string += '&' + k + '=' + newArgs[k];
    }
    string = string.substr(1);
    return string;
};


module.exports = {

  // 请求微信服务器，获取支付连接返回后再客户端生成二维码(需登录)
  // pay: async ctx => {
  pay: async (amount, order_no) => {
    // const {amount, order_no} = ctx.request.body;

    /* 传递参数给微信服务器，返回支付url地址给我们生成二维码，并扫码支付 */ 
    const nonce_str = randomString();
    const body = "nuxtjs闲云旅游微信支付";
    const total_fee = 1;
    const spbill_create_ip = "127.0.0.1";
    const trade_type ='NATIVE';

    // 准备参数
    const order = {
      appid: payConfig.appid,
      body,
      mch_id: payConfig.partner,
      nonce_str,
      notify_url: payConfig.notify_url,
      out_trade_no: order_no,
      spbill_create_ip,
      total_fee,
      trade_type
    }

    // 签名验证
    const sign = paysignapi(order).toUpperCase();

    //准备xml数据
    var xml = `<xml>
      <appid>${order.appid}</appid>
      <body>${order.body}</body>
      <mch_id>${order.mch_id}</mch_id>
      <nonce_str>${order.nonce_str}</nonce_str>
      <notify_url>${order.notify_url}</notify_url>
      <out_trade_no>${order.out_trade_no}</out_trade_no>
      <spbill_create_ip>${order.spbill_create_ip}</spbill_create_ip>
      <total_fee>${order.total_fee}</total_fee>
      <trade_type>${order.trade_type}</trade_type>
      <sign>${sign}</sign>
      </xml>
    `

    const promise = new Promise((resolve, reject) => {
      request({
        url:"https://api.mch.weixin.qq.com/pay/unifiedorder",
        method:"POST",
        body:xml
      },(error,response,content)=>{
          if(error){
              reject({
                message: '发送请求跟微信服务器的交互异常：',
                status: 1
              })
              return;
          }   

          if(!error && response.statusCode == 200){
            console.log(content)
            var code_url,  prepay_id;

            try{
              code_url = getxmlnodevalue("code_url",content.toString("utf-8"));
              prepay_id = getxmlnodevalue("prepay_id",content.toString("utf-8"));
            }catch(err){
              resolve({
                message: '订单号错误',
                status: 1
              })
            }
            
            var ret = {
                appid:order.appid,
                nonceStr:nonce_str,
                package:'preapy_id='+prepay_id,
                signType:'MD5'
            }
            var signjs = paysignapi(ret);
            var data = {
              code_url,
              order_no: order.out_trade_no,
              nonce_str
            };

            resolve(data);
          }
      })
    })

    return await promise;
  },

  checkpay: async ctx => {
    var url = `https://api.mch.weixin.qq.com/pay/orderquery`
    const {id, nonce_str, out_trade_no} = ctx.request.body;
    var ret = {
      appid: payConfig.appid,
      mch_id: payConfig.partner,
      nonce_str,
      out_trade_no
    }

    var sign = paysignapi(ret).toUpperCase();
    var xml = `<xml>
    <appid>${payConfig.appid}</appid>
    <mch_id>${payConfig.partner}</mch_id>
    <nonce_str>${nonce_str}</nonce_str>
    <sign>${sign}</sign>
    <out_trade_no>${out_trade_no}</out_trade_no>
    </xml>`

    const promise = new Promise((resolve, reject) => {
      request({ url: url, method: "POST", body: xml }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
           var result = {};
           result.trade_state = getxmlnodevalue('trade_state', body.toString("utf-8"));
           if(result.trade_state=="SUCCESS"){
              result.statusTxt="支付完成";       
              
              strapi.services.airorder.edit({
                id,
                status: 1,
              });

           }else{
              result.statusTxt = getxmlnodevalue('trade_state_desc',body.toString("utf-8"));
           }

           resolve(result);
        }
      })
    });

    return await promise;
  },


  /**
   * Retrieve airorder records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.airorder.search(ctx.query);
    } else {
      return strapi.services.airorder.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a airorder record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.airorder.fetch(ctx.params);
  },

  /**
   * Count airorder records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.airorder.count(ctx.query);
  },

  /**
   * Create a/an airorder record.
   *
   * @return {Object}
   */
  create: async (ctx) => {
    const {insurances, seat_xid, captcha, ...props} = ctx.request.body;
    let price = 0;

    if(props.users && props.users.length === 0 || !props.users[0].username){
      return ctx.badRequest(null, '乘机人不能为空');
    }

    if(!props.contactName){
      return ctx.badRequest(null, '联系人姓名不能为空');
    }

    if(!props.contactPhone){
      return ctx.badRequest(null, '联系人手机不能为空');
    }

    if(!captcha){
      return ctx.badRequest(null, '手机验证码不能为空');
    }

    // match captcha
    const captchaCount = await strapi.services.captcha.count({ 
      tel: props.contactPhone, 
      code: captcha, 
      // isValid: true
    });

    if(!captchaCount){
      return ctx.badRequest(null, '验证码错误');
    }

    if(insurances){
      for(let i = 0; i < insurances.length; i++){
        const id = insurances[i];
        const _insurance = await strapi.models.airinsurance.where({id}).fetch();
        const insurance = _insurance.toJSON();
        price += (insurance.price * props.users.length); 
      }
    }

    const _air = await strapi.models.air.where({id: props.air}).fetch();
    const air = _air.toJSON();

    air.seat_infos && air.seat_infos.forEach(v => {
      if(seat_xid !== v.seat_xid) return;

      if(v.settle_price){
        price += v.settle_price * props.users.length;
      }else{
        price += v.org_settle_price * props.users.length;
      }
    })

    const orderNo = "XYLY" + Date.now();
    price += air.airport_tax_audlet * props.users.length;

    //  生成支付信息
    const payInfo = await module.exports.pay(price, orderNo);

    if(payInfo.status === 1){
      return ctx.badRequest(null, "订单提交失败，稍后再试");
    }

    const _data = await strapi.services.airorder.add({
      ...props,
      insuranceIds: insurances,
      price,
      account: ctx.state.user.id,
      status: 0,
      orderNo,
      payInfo
    });

    const data = _data.toJSON();
    delete data.account.password;

    return {
      data,
      status: 0,
      message: "订单提交成功",
    };
  },

  /**
   * Update a/an airorder record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.airorder.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an airorder record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.airorder.remove(ctx.params);
  }
};
