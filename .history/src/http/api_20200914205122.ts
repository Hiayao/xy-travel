import service from './index';

export default {
    // getBanners({ subject, model, testType }: { subject: string; model: string; testType: string }) {
    //     return service.get(`/query?subject=${subject}&model=${model}&testType=${testType}&key=f9d1022a6c59a0ecf19d02f92d3efd13`)
    // }
    getBanners() {
        return service.get(`/scenics/banners`)
    }
    get
}
