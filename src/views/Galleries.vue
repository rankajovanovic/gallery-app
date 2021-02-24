<template>
  <div class="container">
    <h1>All Galleries</h1>

    <ul class="list-group list-group-flush">
      <li v-for="gallery in galleries" :key="gallery.index" class="list-group-item">
        <h3><router-link :to="{name: 'single-gallery', params: {id: gallery.id}} ">
                            {{ gallery.name }}
                        </router-link></h3>
        <div>
          <p>{{gallery.description}}</p>
          <p><b>Created by:</b> {{gallery.user.first_name}} {{gallery.user.last_name}}</p>
          <p><b>Created at:</b> {{gallery.created_at}}</p>
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
      galleries: []
    }
  },
  
  beforeRouteEnter(to, from, next) {
    galleryService.getAll().then( data  => {
    next((context) => {
      context.galleries = data
      })
    })
    next()
  },
    
}
</script>

<style>
body {
	background-image: url("../assets/images/background.jpg");
}
</style>