
/**
 *
 * @apiDefine RkNotFoundException
 *
 * @apiError RkNotFoundException 找不到相关数据
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
 *       "error": {
 *           "statusCode": 400,
 *           "error": "Bad Request",
 *           "message" ""
 *       }
 *     }
 *
 */


/**
* 
* @api {get}  /  接口统一说明
* @apiGroup A
*
* @apiExample  接口统一说明
* 接口地址： http://localhost:1337
*
* 分页查询条件： 
* {
*    _start: 默认0,
*    _limit: 获取条数
*    _sort: 排序
* }
* 
* 访问需要登录授权接口：
* 需要添加头信息Authorization
* {
*    Authorization： Bearer [token]
* }
*/


/**
* 
* @api {post} /accounts/login 登录
* @apiName Login
* @apiGroup ACCOUNT
*
* @apiParam {String} username 手机号码
* @apiParam {String} password 密码
* 
* @apiSuccess {String} jwt token
* @apiSuccess {Object} user 用户信息
* 
* @apiSuccessExample 成功响应：
{
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTU0NTIwMDAzLCJleHAiOjE1NTcxMTIwMDN9.qiTS5nyRPz14X4wfcmy7pen6edXpimL5iBbTHY5K-8o",
    "user": {
        "id": 1,
        "username": "13312882474",
        "email": null,
        "role": 2,
        "nickname": "my",
        "created_at": 1553587751614,
        "updated_at": 1553587751627
    }
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {post} /accounts/register 注册
* @apiName Register
* @apiGroup ACCOUNT
*
* @apiHeader {string} Content-Type application/x-www-form-urlencoded
*
* @apiParam {String} username 手机号码
* @apiParam {String} nickname 昵称
* @apiParam {String} captcha  手机验证码
* @apiParam {String} password 密码
* 
* @apiSuccess {String} jwt token
* @apiSuccess {Object} user 用户信息
* 
* @apiSuccessExample 成功响应：
{
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNTU0NTIwODMwLCJleHAiOjE1NTcxMTI4MzB9.w2LbX41OFG4VJArlGq4BJBVFdjRzb2v5Z_uhsb4oPhA",
    "user": {
        "id": 6,
        "username": "13312882472",
        "email": null,
        "role": {
            "id": 2,
            "name": "Authenticated",
            "description": "Default role given to authenticated user.",
            "type": "authenticated"
        },
        "nickname": "my",
        "created_at": 1554520830711,
        "updated_at": 1554520830723,
        "comments": []
    }
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {post} /captchas 手机验证码
* @apiName getCaptchas
* @apiGroup ACCOUNT
*
* @apiHeader {string} Content-Type application/x-www-form-urlencoded
*
* @apiParam {String} tel 手机号码
* 
* @apiSuccessExample 成功响应：
{
    status: 0,
    message: "success"
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {get} /scenics/banners 首页轮播图
* @apiName get index banners
* @apiGroup Index
* 
* @apiSuccessExample 成功响应：
{
    data: [{
        url: "", // 图片链接
        desc: "", // 图片描述
    }],
    total: 100
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {get} /cities 查找城市
* @apiName getCities
* @apiGroup Address
*
*
* @apiParam {String} name 城市名称
* 
* @apiSuccessExample 成功响应：
{
    data: [{
        ...,
        scenics: [] // 景点，展示在酒店的搜索的区域位置
    }],
    total: 100
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {get} /province/search? 查找省份下的城市
* @apiName getProvince
* @apiGroup Address
*
*
* @apiParam {Number} id 省份id
* 
* @apiSuccessExample 成功响应：
{
    data: {},
    total: 100
}
*
* @apiUse RkNotFoundException
*/


/**
* 
* @api {get} /hotels 酒店详情
* @apiName Hotels
* @apiGroup HOTEL
*
* @apiParam {Number} id             酒店id(酒店详情)
* @apiParam {Number} city 			城市id
* @apiParam {Number} price_in       酒店价格
* @apiParam {Number} scenic         景点id
* @apiParam {String} name_contains 	名字模糊查询
* @apiParam {Number} hotellevel     酒店星级
* @apiParam {Number} hoteltype      酒店类型
* @apiParam {Number} hotelbrand     酒店品牌
* @apiParam {Number} hotelasset     酒店设施
* @apiParam {Date}   enterTime       入店时间
* @apiParam {Date}   enterTime       离店时间
* @apiParam {Number} person         人数
* @apiParam {String} _sort  		排序
* @apiParam {Number} _limit  		条数
* @apiParam {Number} _start         开始数据（分页）
*
* @apiSuccess {Object} data 酒店信息
* 
* @apiExample 请求例子
* 	127.0.0.1:1337/hotels?city=197&enterTime=2019-06-12&leftTime=2019-07-15&_limit=1&_start=0
* 
* @apiSuccessExample 成功响应：
{
    "data": [       // 酒店列表
        
    ],
    nextStart: 10,  // 下次分页开始
    total: 55       // 总数据条数
    
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {get} /hotels/options 酒店选项
* @apiName Hotel Options
* @apiGroup HOTEL
*
* 
* 
* @apiSuccessExample 成功响应：
{
    data: {
        "levels": [],   // 酒店等级
        "types": [],    // 酒店类型
        "assets": [],   // 酒店设施
        "brands": []    // 酒店品牌
    }
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {get} /hotels/comments 获取酒店评论
* @apiName Get Hotel Comments
* @apiGroup Hotel
*
* @apiParam {Number} hotel          酒店id
* @apiParam {String} _sort          排序
* @apiParam {Number} _limit         条数
* @apiParam {Number} _start         开始数据（分页）
* 
* @apiSuccessExample 成功响应：
{
    "data": [
        {
            "id": 1,
            "account": 1,
            "content": "酒店环境很好",
            "like": 1,
            "likeIds": [],
            "score": 4.5,
            "hotel": 2,
            "created_at": 1554368708175,
            "updated_at": 1554705888282
        }
    ],
    "total": 1
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {get} /hotels/comments 获取酒店评论
* @apiName Get Hotel Comments
* @apiGroup COMMENT
*
* @apiParam {Number} hotel          酒店id
* @apiParam {String} _sort          排序
* @apiParam {Number} _limit         条数
* @apiParam {Number} _start         开始数据（分页）
* 
* @apiSuccessExample 成功响应：
{
    "data": [
        {
            "id": 1,
            "account": 1,
            "content": "酒店环境很好",
            "like": 1,
            "likeIds": [],
            "score": 4.5,
            "hotel": 2,
            "created_at": 1554368708175,
            "updated_at": 1554705888282
        }
    ],
    "total": 1
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {get} /comments/like 评论点赞
* @apiName Hotel Comments Like
* @apiGroup COMMENT
*
* @apiHeader {String} Authorization token
*
* @apiParam {Number} id             评论id
* 
* @apiSuccessExample 成功响应：
{
    id: 1
}
*
* @apiUse RkNotFoundException
*/



/**
* 
* @api {post} /comments 提交评论
* @apiName Set Hotel Comments
* @apiGroup COMMENT
*
* @apiHeader {string} Content-Type application/json
* @apiHeader {String} Authorization token
*
* @apiParam {String} content 评论内容
* @apiParam {Object} score   评分对象
* @apiParam {Float} score.location   位置评分
* @apiParam {Float} score.service    服务评分
* @apiParam {Float} score.fancility  设施评分
* @apiParam {Float} score.all        总体评分
* @apiParam {Array}  pics             图片
*
* @apiParam {Number} hotel            酒店id 
* @apiParam {Number} post             文章id
*
* @apiParam {Number} follow           回复id
* 
* @apiSuccessExample 成功响应：
{
    "status": 0,
    "message": ""
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {get} /upload 文件上传
* @apiName upload
* @apiGroup UPLOAD
*
* @apiHeader {String} Authorization token
*
* @apiParam {files} files       评论id
*
* @apiExample 请求例子
<form>
  <!-- Can be multiple files -->
  <input type="file" name="files">
  <input type="submit" value="Submit">
</form>

<script type="text/javascript">
  const formElement = document.querySelector('form');

  formElement.addEventListener('submit', (e) => {
    e.preventDefault();

    const request = new XMLHttpRequest();

    request.open('POST', 'http://127.0.0.1:1337/upload');

    request.send(new FormData(formElement));
  });
</script>
* 
* @apiSuccessExample 成功响应：
[
    {
        created_at: 1554780485209,
        ext: ".jpeg",
        hash: "a067aac50f3c4224bfb060f7c81dc54c",
        id: 3,
        mime: "image/jpeg",
        name: "wKgBZ1laE5GAH0GWAAGFZyv3znE68.jpeg",
        provider: "local",
        public_id: null,
        related: [],
        sha256: "xn-vndROmvVAbUIqrahe0zAizgAn2S1cEKcA6_ubcKE",
        size: "99.96",
        updated_at: 1554780485233,
        url: "/uploads/a067aac50f3c4224bfb060f7c81dc54c.jpeg"
    }
]
*
* @apiUse RkNotFoundException
*/


/**
* 
* @api {get} /airs/city 实时机票城市
* @apiName getAirsCity
* @apiGroup JiPiao
*
* @apiParam {String} name       出发城市
*
* @apiSuccessExample 成功响应：
{
  data: [{
    code: "440100000000",
    created_at: "2019-04-02 08:18:16",
    id: 197,
    level: "2",
    name: "广州市",
    parentCode: "440000000000",
    sort: "CAN",
    updated_at: 1558617184703
  }];
  total: 1
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {get} /airs/sale 推荐机票
* @apiName getAirsSale
* @apiGroup JiPiao
*
* @apiSuccessExample 成功响应：
{
  data: [{
    cover: "https://imgsrc.baidu.com/baike/pic/item/a71ea8d3fd1f41340d8f3dec281f95cad0c85ee3.jpg"
    departCity: "广州"
    departCode: "CAN"
    departDate: "2019-06-17"
    destCity: "上海"
    destCode: "SHA"
    price: 760
  }];
  total: 1
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {get} /airs/city_sort 城市简称 [弃用]
* @apiName getCitySort
* @apiGroup JiPiao
*
* @apiParam {String} name  出发城市
*
* @apiSuccessExample 成功响应：
{
  data: "";
  status: 0
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {get} /airs 机票列表
* @apiName getAirs
* @apiGroup JiPiao
*
* @apiParam {String} departCity       出发城市
* @apiParam {String} departCode       出发城市代码
* @apiParam {String} destCity         目标城市
* @apiParam {String} destCode         目标城市代码
* @apiParam {String} departDate       日期 2019-05-01
*
* 
* @apiSuccessExample 成功响应：
{
  info: {
    departCity,
    destCity,
    departDate
  },
  flights,
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
*
* @apiUse RkNotFoundException
*/


/**
* 
* @api {get} /airs/:id 选择机票
* @apiName airs
* @apiGroup JiPiao
*
* @apiParam {number} /:id             机票id
* @apiParam {String} seat_xid         座位id
*
* 
* @apiSuccessExample 成功响应：
{
    "id": 2,
    "org_city_name": "广州",
    "dst_city_name": "上海",
    "airline_name": "国航",
    ...
}
*
* @apiUse RkNotFoundException
*/


/**
* 
* @api {post} /airorders 提交机票订单
* @apiName air orders
* @apiGroup JiPiao
*
* @apiHeader {String} Authorization token
*
* @apiParam {Array}    users<Object{username,id}>             用户列表
* @apiParam {Array}    insurances<Number>       保险id
* @apiParam {String}               contactName        联系人名字
* @apiParam {String}               contactPhone       联系人电话
* @apiParam {Boolean}              invoice            是否需要发票 
* @apiParam {String}               seat_xid           座位id
* @apiParam {Number}               air                航班id  
* 
* @apiSuccessExample 成功响应：
{
    "status": 0,
    "message": "订单提交成功"
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {get} /airorders/:id    订单详情
* @apiName air detail
* @apiGroup JiPiao
*
* @apiHeader {String} Authorization token
* 
* @apiSuccessExample 成功响应：
{
    ...// 订单详情
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {post} /airorders/pay 微信付款
* @apiName air pay
* @apiGroup JiPiao
*
* @apiHeader {String} Authorization token
*
* @apiParam {Number}               amount            订单金额 
* @apiParam {String}               order_no          订单编号
* 
* @apiSuccessExample 成功响应：
{
    "order_id": "BD20190530120001",                     // 订单编号
    "code_url": "weixin://wxpay/bizpayurl?pr=5benFv3",  // 支付二维码链接
    "outTrade_no": "BD20190530120001",                  // 订单编号(带字母)
    "nonce_str": "mk8FGAmn3DhJjSCedQdtGRbfbGwt8n6A"
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {post} /airorders/checkpay 查询付款状态
* @apiName air check pay
* @apiGroup JiPiao
*
* @apiHeader {String} Authorization token
*
* @apiParam {Number}               id                    订单id  
* @apiParam {Number}               nonce_str             支付接口返回的订单金额  
* @apiParam {String}               out_trade_no          订单编号
* 
* @apiSuccessExample 成功响应：
{
{
    "trade_state": "NOTPAY",
    "statusTxt": "订单未支付"
}
*
* @apiUse RkNotFoundException
*/


/**
* 
* @api {get} /posts 文章列表
* @apiName get posts
* @apiGroup POSTS
*
* @apiParam {Number}       city        城市id | 城市名称
* 
* @apiSuccessExample 成功响应：
{
    "data": {},
    "total": 0
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {get} /posts/cities 城市菜单列表
* @apiName get posts cities
* @apiGroup POSTS
* 
* @apiSuccessExample 成功响应：
{
    "data": [
        type: ""        // 主题类型
        children: []    // 城市列表 
    ],
    "total": 0
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {get} /posts 文章详情
* @apiName get posts detail
* @apiGroup POSTS
*
* @apiParam {Number}       id             文章id
* @apiSuccessExample 成功响应：
{
    ...文章详情
}
*
* @apiUse RkNotFoundException
*/



/**
* 
* @api {post} /posts 新增文章
* @apiName Add posts
* @apiGroup POSTS
*
* @apiHeader {String} Authorization token
*
* @apiParam {Text}         content            文章内容
* @apiParam {String}       title              文章标题
* @apiParam {Number}       city               城市id | 城市名称
* 
* @apiSuccessExample 成功响应：
{
    "status": 0,
    "message": "文章新增成功",
    "data": {}
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {get} /postkinds 获取文章分类
* @apiName Get post types
* @apiGroup POSTS
* 
* @apiSuccessExample 成功响应：
{
 []
}
*
* @apiUse RkNotFoundException
*/


/**
* 
* @api {get} /posts/like 文章点赞
* @apiName Posts Like
* @apiGroup POSTS
*
* @apiHeader {String} Authorization token
*
* @apiParam {Number} id             评论id
* 
* @apiSuccessExample 成功响应：
{
    id: 1
}
*
* @apiUse RkNotFoundException
*/


/**
* 
* @api {get} /posts/comments 获取文章评论
* @apiName Get Post Comments
* @apiGroup POSTS
*
* @apiParam {Number} post           文章id
* @apiParam {String} _sort          排序
* @apiParam {Number} _limit         条数
* @apiParam {Number} _start         开始数据（分页）
* 
* @apiSuccessExample 成功响应：
{
    "data": [
        {
            "id": 1,
            ...
        }
    ],
    "total": 1
}
*
* @apiUse RkNotFoundException
*/


/**
* 
* @api {get} /posts/star  收藏文章
* @apiName Star Posts
* @apiGroup POSTS
*
* @apiHeader {String} Authorization token
*
* @apiParam {Number} id       文章id
* 
* @apiSuccessExample 成功响应：
{
    "status": 0,
    "message": "收藏成功"
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {get} /posts/recommend  推荐文章
* @apiName Get Recommend Post 
* @apiGroup POSTS
*
*
* @apiParam {Number} id       文章id
* 
* @apiSuccessExample 成功响应：
{
    "status": 0,
    "message": "收藏成功"
}
*
* @apiUse RkNotFoundException
*/