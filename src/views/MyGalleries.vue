<template>
  <div class="container">
    <h2>My galleries</h2>

     <ul class="list-group list-group-flush">
      <li v-for="gallery in galleries" :key="gallery.index" class="list-group-item">
        <h3>{{gallery.name}}</h3>
        <div>
          <p v-if="!!gallery.description">{{gallery.description}}</p>
          <p><b>Created at:</b>{{gallery.created_at}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import galleryService from '../services/GalleryService'
export default {
  data() {
    return {
      galleries: [],
    }
  },

  beforeRouteEnter (to, from, next) {
        next(vm => {
          
            vm.id = localStorage.getItem('user_id')
            galleryService.getMyGalleries(vm.id)
                .then(galleries => {
                    vm.galleries = galleries.data
                   
                })
        })
    },
}
</script>

<style>

</style>