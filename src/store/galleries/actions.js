import galleryService from '../../services/GalleryService'

export const actions = {

  async getGalleries(store, payload) {
    const data = await galleryService.getAll(payload)
    store.commit('setGaleries', data);
  },
  async deleteGallery(store, gallery) {
    await galleryService.deleteGallery(gallery.id);
    
    store.commit('deleteGallery', gallery);
  },
}