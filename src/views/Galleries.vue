<template>
  <div class="container">
    <h1>All Galleries</h1>

    <search @handleSearch="setSearchText" />
   
     
      <div v-if="galleries.length !== 0">
      <ul class="list-group list-group-flush">
            <li v-for="gallery in galleries" :key="gallery.index" class="list-group-item">
              <h3><router-link :to="{name: 'single-gallery', params: {id: gallery.id}} ">
                {{ gallery.name }}</router-link></h3>
                <img class="img-fluid" width="500px" height="auto" :src="gallery.images[0] ? gallery.images[0].imageURL : ''"> 
              
              <div class="pt-3">
                <span class="pr-5"><b>Author:</b> <router-link :to="{name: 'author-galleries', params: {id: gallery.user.id}}"> {{ gallery.user.first_name }} {{ gallery.user.last_name }} </router-link></span>
                <span><b>Created at:</b> {{ gallery.created_at | formatDate() }} </span>
              </div>
            </li>
          </ul>
      </div>
    <div v-else>
      <p>No galleries found. Be first and make one!</p>
    </div>
  <button class="btn btn-danger" v-if="currentSize <= numberPerPage" @click="loadMoreGalleries">Load More...</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {mixins} from "../mixins/DateMixin"
import Search from '../components/Search.vue';

export default {
	components: { Search },
  mixins: [mixins],
  data() {
    return {
      searchText: '',
      currentSize: 10,
    }
  },
  computed: 
	{
		...mapGetters("galleries", ["galleries", "numberPerPage"]),
    ...mapGetters("auth", ["isAuthenticated"])   
	},
  methods: {
   ...mapActions("galleries", ["getGalleries"]),
   loadMoreGalleries() {
      this.currentSize += 10
      this.getGalleries({'pagination': this.currentSize, 'searchText': this.searchText})
    },
    setSearchText(search) {
      this.searchText = search
      this.getGalleries({'pagination': this.currentSize, 'searchText': this.searchText})
    },
  
    

  },
     beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.getGalleries({'pagination':10, 'searchText': ''});
            })
      }
    
}
</script>

<style>
body {
	background-image: url("../assets/images/background.jpg");
}
.searchBar {
  display: flex;
  justify-content: space-between;
}
</style>