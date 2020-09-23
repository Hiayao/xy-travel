'use strict';

/**
 * Air.js controller
 *
 * @description: A set of functions called "actions" for managing `Air`.
 */

const fetch = require('node-fetch');
const querystring = require("querystring");
const moment = require("moment")

module.exports = {

  /**
  * 特价机票
  */
  sale: async ctx => {
    return {
      data: [
        {departCity: "广州", departCode: "CAN", destCity: "上海", destCode: "SHA", departDate: moment().format("YYYY-MM-DD"), cover: "https://imgsrc.baidu.com/baike/pic/item/a71ea8d3fd1f41340d8f3dec281f95cad0c85ee3.jpg", price: 760},
        {departCity: "广州", departCode: "CAN", destCity: "上海", destCode: "SHA", departDate: moment().format("YYYY-MM-DD"), cover: "https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=d4e2f29522381f309a198aab99004c67/6a63f6246b600c33cd891e65104c510fd8f9a1af.jpg", price: 760},
        {departCity: "广州", departCode: "CAN", destCity: "上海", destCode: "SHA", departDate: moment().format("YYYY-MM-DD"), cover: "https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=9154c841bcfd5266a32b3b169b199799/3812b31bb051f8199687c7e0d0b44aed2f73e7fe.jpg", price: 760},
        {departCity: "广州", departCode: "CAN", destCity: "上海", destCode: "SHA", departDate: moment().format("YYYY-MM-DD"), cover: "https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=a1b035c61a38534388cf8023a312b01f/9c16fdfaaf51f3de20157fce9eeef01f3b2979f1.jpg", price: 760},
      ]
    }
  },

  findCity: async ctx => {
    const {name} = ctx.query;
    const condition = {name_contains: name};

    // 模糊搜索不能使用strapi.models
    //const provinces = await strapi.services.disprovince.fetchAll(condition);
    const _cities = await strapi.services.discity.fetchAll(condition);
    const cities = [..._cities.toJSON()];

    for(let i = 0, item; item = cities[i++];){
    	if(!item.sort){
    		const sortName = item.name.replace("市", "");
    		const url = encodeURI(`https://www.mafengwo.cn/flight/rest/citySuggest/?filter[prefix]=${sortName}`);
    		const result = await fetch(url);
    		const {data: { ex }, errno } = await result.json();

 
    		if(errno === 0 && !!ex[0]){
    			cities[i - 1].sort = ex[0].c;

    			await strapi.services.discity.edit({
	        	id: item.id, 
	        	sort: ex[0].c
	        }) ;
    		}
        //  else{
		    //     return ctx.badRequest(null, '查询错误，请稍后再试');
		    //     break;
		    // }
    	}
    }

    const data = cities.map(v => {
      let { hotels, scenics, posts, ...props} = v;
      return props;
    })

    ctx.body = {
      data,
      total: data.length
    };
  },

  findCitySort: async ctx => {
    const {name} = ctx.query;
    const sortName = name.replace("市", "");

    //const province = await strapi.models.disprovince.where({name}).fetch();
    const _city = await strapi.models.discity.where({name}).fetch();

    //const _dest = province || city;

    if(_city){
      const url = encodeURI(`https://www.mafengwo.cn/flight/rest/citySuggest/?filter[prefix]=${sortName}`);
      //const url = `http://www.mafengwo.cn/flight/rest/flightlist/?${querystring.stringify(args)}`;
      const result = await fetch(url);
      const {data: { ex }, errno } = await result.json();
      const dest = _city.toJSON();


      if(errno === 0 && !!ex[0]){
        // if(dest.level == 1){
        //   await strapi.services.disprovince.edit({
        //     ...dest, 
        //     sort: ex[0].c
        //   });
        // }

        if(dest.level == 2){
          await strapi.services.discity.edit({
            ...dest, 
            sort:  ex[0].c
          }) ;
        }

      }else{
        return ctx.badRequest(null, '查询错误，请稍后再试');
      }

      ctx.body = {
        data: ex[0].c,
        status: 0
      };
    }else {
         return ctx.badRequest(null, '城市名称不存在');
      }
    },


  /**
   * Retrieve air records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {

    const {departCity, departCode, destCity, destCode, departDate} = ctx.query;
    const delay = 2000 * 60;
    let flightRes = [];

    const _airs = await strapi.services.air.fetchAll({
      org_city_name: departCity,
      dst_city_name: destCity
    });
    const air = _airs.toJSON();

    if(air && air.length ){
      flightRes = air.map(v => {
        return {
          ...v,
          arr_date: departDate,
          dep_date: departDate,
          arr_datetime: departDate + " " +v.arr_datetime.split(" ")[1],
          dep_datetime: departDate + " " +v.dep_datetime.split(" ")[1]
        }
      });
    }else{
      // 防止第三方接口挂掉
      try{
        const args = {
          "filter[departCity]": departCity,
          "filter[departCode]": departCode,
          "filter[destCity]": destCity,
          "filter[destCode]": destCode,
          "filter[departDate]": departDate
        }
        const url = `http://www.mafengwo.cn/flight/rest/flightlist/?${querystring.stringify(args)}`;
        const result = await fetch(url);
        const res = await result.json();

        if(!res.errno == 0){
          return ctx.badRequest(null, res.error);
        }

        const {flights} = res.data.ex;

        for(var i = 0; i < flights.length; i ++){
          const {arrTime, correctness, depTime, dst_city_code, flight_share, fuel_tax_audlet, fuel_tax_child, meal, org_city_code, ota_id, plane_type, stop_num, ...flight} = flights[i];

          const _newFlight = await strapi.services.air.add({...flight});
          const newFlight = _newFlight.toJSON();

          flightRes.push(newFlight);
        }
      }catch(err){
        // 第三方接口问题
      }
      
    }

    const airport = [...new Set(flightRes.map(v => {
      return v.org_airport_name;
    }))];
    const company = [...new Set(flightRes.map(v => {
      return v.airline_name;
    }))]

    return {
      info: {
        departCity,
        destCity,
        departDate
      },
      flights: flightRes,
      total: flightRes.length,
      options: {
        airport,
        flightTimes: [
          {from: 0, to: 6},
          {from: 6, to: 12},
          {from: 12, to: 13},
          {from: 13, to: 19},
          {from: 19, to: 24},
        ],
        company
      }
    }
  },

  /**
   * Retrieve a air record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {

    const _air = await strapi.services.air.fetch(ctx.params);

    if(!_air){
      return ctx.badRequest(null, '当前机票信息已过期');
    }

    const air = _air.toJSON();
    const {seat_xid} = ctx.query;

    const seatInfo = air.seat_infos.filter(v => {
      return v.seat_xid === seat_xid;
    })[0];

    const _insurances = await strapi.models.airinsurance.fetchAll();
    const insurances = _insurances.toJSON();

    return {
      ...air,
      seat_infos: seatInfo,
      insurances
    };
  },

  /**
   * Count air records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.air.count(ctx.query);
  },

  /**
   * Create a/an air record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.air.add(ctx.request.body);
  },

  /**
   * Update a/an air record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.air.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an air record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.air.remove(ctx.params);
  }
};
