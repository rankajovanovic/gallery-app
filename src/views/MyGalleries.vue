<template>
  <div class="container">
    <h2>My galleries</h2>

       <div v-if="galleries.length !== 0">
      <ul class="list-group list-group-flush">
            <li v-for="gallery in galleries" :key="gallery.index" class="list-group-item">
              <h2><router-link :to="{name: 'single-gallery', params: {id: gallery.id}} ">
                {{ gallery.name }}</router-link></h2>
                <img class="img-fluid" width="500px" height="auto" :src="gallery.images[0] ? gallery.images[0].imageURL : ''"> 
              
              <div class="pt-3">

                <span><b>Created at:</b> {{gallery.created_at}}</span>
              </div>
            </li>
          </ul>
      </div>
   

    <div v-else>
            <p>No galleries found</p>
    </div>
  </div>
</template>

<script>
import  galleriesService  from './../services/GalleryService'
export default {
    data() {
        return {
            galleries: []
        }
    },

    beforeRouteEnter(to, from, next) {
        galleriesService.getMyGalleries(localStorage.getItem('user_id'))
        .then(data => {
            next(vm => {
                vm.galleries = data;
                console.log(data);
            })
        })
    }
}
</script>

<style>

</style>