export const mutations = {
  setGaleries(state, payload) {
    state.galleries = payload[0];
    state.numberPerPage = payload[1]
  },
  deleteGallery(state, gallery) {
    state.galleries = state.galleries.filter((m) => m.id !== gallery.id);
  },

}