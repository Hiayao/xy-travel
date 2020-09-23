import service from './index';

export default {
    // getBanners({ subject, model, testType }: { subject: string; model: string; testType: string }) {
    //     return service.get(`/query?subject=${subject}&model=${model}&testType=${testType}&key=f9d1022a6c59a0ecf19d02f92d3efd13`)
    // }
    //获取轮播图
    getBanners() {
        return service.get(`/scenics/banners`)
    },
    //获取验证码
    getCaptchas(tel: number) {
        return service.post(`/captchas`, { tel })
    },
    //注册
    register( { username, nickname, captcha, password }:{username: string, nickname: string, captcha: string, password: string}) {
        return service.post(`/accounts/register`, { username, nickname, captcha, password })
    }
}
