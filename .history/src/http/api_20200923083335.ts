import service from './index';
const token = localStorage.getItem('token')
export default {
    //获取轮播图
    getBanners() {
        return service.get(`/scenics/banners`)
    },
    //获取验证码
    getCaptchas(tel: string) {
        return service.post(`/captchas`, { tel })
    },
    //注册
    register({ username, nickname, captcha, password }: { username: string; nickname: string; captcha: string; password: string }) {
        return service.post(`/accounts/register`, { username, nickname, captcha, password })
    },
    //登录
    login({ username, password }: { username: string; password: string }) {
        return service.post(`/accounts/login`, { username, password })
    },
    // 查找城市
    getCities(name: string) {
        return service.get(`/cities?name=${name}`)
    },
    // 城市菜单列表
    getCityList() {
        return service.get(`/posts/cities`)
    },
    //  文章列表
    getPosts(city: number | string) {
        return service.get(`/posts?city=${city}`)
    },
    //  文章列表2
    getPostAll() {
        return service.get(`/posts`)
    },
    //  文章详情
    PostDetail(id: number) {
        return service.get(`/posts?id=${id}`)
    },
    //  获取文章评论
    comments({ post, _limit, _start }: { post: number; _limit: number; _start: number }) {
        return service.get(`/posts/comments?post=${post}&_limit=${_limit}&_start=${_start}`)
    },
    //  推荐文章
    relevantPost(id: number) {
        return service.get(`/posts/recommend?id=${id}`)
    },
    //  推荐机票
    proposalAir() {
        return service.get(`/airs/sale`)
    },
    //  机票列表
    airList({ departCity, departCode, destCity, destCode, departDate }: { departCity: string; departCode: string; destCity: string; destCode: string; departDate: string }) {
        return service.get(`/airs?departCity=${departCity}&departCode=${departCode}&destCity=${destCity}&destCode=${destCode}&departDate=${departDate}`)
    },
    //  实时机票城市
    airCity(name: string) {
        return service.get(`/airs/city?name=${name}`)
    },
    //  选择机票
    getAirs(id: number) {
        return service.get(`/airs/${id}`)
    },
    //提交机票订单
    airorders({ users, insurances, contactName, contactPhone, invoice, seat_xid, air, captcha }: { users: object[]; insurances: string[]; contactName: string; contactPhone: string; invoice: boolean; seat_xid: string; air: number; captcha: string; }) {
        return service.post(`/airorders`, { users, insurances, contactName, contactPhone, invoice, seat_xid, air, captcha },
            {
                headers:
                    { Authorization: 'Bearer ' + token }
            })
    },
    //  查找省份下的城市
    searchCity(id: number) {
        return service.get(`/province/search?id=${id}`)
    },
     // 酒店选项
     gethotels() {
        return service.get(`/hotels/options`)
    },
}
