<template>
  <div class="container">   
      <div v-if="galleries.length !== 0">
      <ul class="list-group list-group-flush">
        <h1>Galleries created by {{galleries[0].user.first_name}} {{galleries[0].user.last_name}}</h1>
            <li v-for="gallery in galleries" :key="gallery.index" class="list-group-item">
              <h3><router-link :to="{name: 'single-gallery', params: {id: gallery.id}} ">
                {{ gallery.name }}</router-link></h3>
                <img class="img-fluid" width="500px" height="auto" :src="gallery.images[0] ? gallery.images[0].imageURL : ''"> 
              
              <div class="pt-3">
                <span><b>Created at:</b> {{ gallery.created_at | formatDate() }}</span>
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
import {mixins} from "../mixins/DateMixin"
export default {
    mixins: [mixins],
    data() {
        return {
            galleries: []
        }
    },

    beforeRouteEnter(to, from, next) {
        galleriesService.getAuthorGalleries(to.params.id)
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