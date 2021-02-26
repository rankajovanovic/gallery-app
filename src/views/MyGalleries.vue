<template>
  <div class="container">
    <h1 class="">My galleries</h1>
      <search @handleSearch="setSearchText" />

       <div v-if="galleries.length !== 0">
      <ul class="list-group list-group-flush">
            <li v-for="gallery in galleries" :key="gallery.index" class="list-group-item">
              <h3><router-link :to="{name: 'single-gallery', params: {id: gallery.id}} ">
                {{ gallery.name }}</router-link></h3>
                <img class="img-fluid" width="500px" height="auto" :src="gallery.images[0] ? gallery.images[0].imageURL : ''"> 
              
              <div class="pt-3">
                <span><b>Created at:</b> {{ gallery.created_at | formatDate() }} </span>
              </div>
             
              
          <router-link class="btn btn-success" :to="{name: 'edit-gallery', params: {id: gallery.id}}"><i class="bi bi-pencil pr-3"  width="20" height="20"></i> Edit Gallery</router-link>
            <button @click="deleteGallery()" class="btn btn-danger">
              <i class="bi bi-trash-fill" width="20" height="20" ></i> Delete Gallery
            </button>

            </li>
          </ul>
      </div>
   
    <div v-else>
      <p>No galleries found.</p>
    </div>
 <button
      class="btn btn-danger"
      v-if="currentSize <= numberPerPage"
      @click="loadMoreGalleries"
    >
      Load More
    </button>

  </div>
</template>

<script>

import { mapGetters } from "vuex";
import  galleriesService  from './../services/GalleryService'
import { mixins } from "../mixins/DateMixin.js";
import Search from '../components/Search.vue';
export default {
	components: { Search },
  mixins: [mixins],
    data() {
        return {
            galleries: [],
            currentSize: 10,
      searchText: "",
         
        }
    },
     computed: 
	{
    ...mapGetters("auth", ["isAuthenticated"]),
    ...mapGetters("galleries", ["numberPerPage"])
	},
  methods: {
       loadMoreGalleries() {
      this.currentSize += 10;
      this.getYourGalleries({
        pagination: this.currentSize,
        searchText: this.searchText,
      });
    },
    setSearchText(search) {
      this.searchText = search;
      this.getYourGalleries({
        pagination: this.currentSize,
        searchText: this.searchText,
      });
    },
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
.container {
  background-color: white;
}
</style>