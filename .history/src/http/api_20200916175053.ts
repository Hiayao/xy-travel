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
     getPosts(city: number|string) {
        return service.get(`/posts?city=${city}`)
    },
     //  文章列表2
     getPostAll(start: number,limit: number) {
        return service.get(`/post?start=${start}&limit=${limit}`)
    },
}
