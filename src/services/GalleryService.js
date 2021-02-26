import BaseService from './BaseService';

class GalleryService extends BaseService {
  async getAll(payload) {
    
    const { data } = await this.http.get('/galleries', {  
      headers: {
      'pagination': payload.pagination,
      'searchText': payload.searchText
    } 
    });
    return data;
  }

  async getGallery(id) {
    const { data } = await this.http.get(`/galleries/${id}`);
    console.log(data);
    return data;
  }

  async createGallery(gallery) {
    const { data } = await this.http.post('galleries', gallery);
    return data;
  }

  async updateGallery(id, gallery) {
    const { data } = await this.http.put(`/galleries/${id}`, gallery);
    return data;
  }

  async deleteGallery(id) {
    const { data } = await this.http.delete(`/galleries/${id}`);
    return data;
  }

  async getMyGalleries(user_id) {
    const { data } = await this.http.get(`/my-galleries`, { params: { user_id } });
    return data;
  }

  async getAuthorGalleries(id) {
    const { data } = await this.http.get(`/author-galleries/${id}`);
    return data;
  }
}

const galleryService = new GalleryService();
export default galleryService;
