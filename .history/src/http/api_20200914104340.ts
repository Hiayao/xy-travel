import service from './index';

export default {
    
    getBanners() {
        return service.get(`/scenics/banners`)
    }
}
