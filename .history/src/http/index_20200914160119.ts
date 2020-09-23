import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import nprogress, { done } from 'nprogress'
// 如果nprogress报错就要安装 cnpm i -S @types/nprogress

const isPro: boolean = process.env.NODE_ENV === 'production'

const service: AxiosInstance = axios.create({
    baseURL: isPro ? 'http://localhost:1337' : '/api',
    timeout: 10000
})

service.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
    nprogress.start()
    const token = localStorage.getItem('token')
    config.headers['Auth'] = 'Bearer' + token
    return config
}, (err: AxiosError) => {
    nprogress.done()
    console.log(err);
    return Promise.reject(err)
})

service.interceptors.response.use((res: AxiosResponse): AxiosResponse => {
    nprogress.done()
    return res.data
}, (err: AxiosError) => {
    if (err.response && err.response.status) {
        const status = err.response.status
        if(status === 400){
            alert('参数错误')
        }
        if(status === 401){
            alert('登录过期，请重新登录')
        }
        if(status === 403){
            alert('没有权限')
        }
        if(status === 404){
            alert('接口路径错误')
        }
        if(status === 500){
            alert('服务器出错')
        }
        if(status === 503){
            alert('服务器在维护')
        }
    }
    return Promise.reject(err)
})

export default service