<template>
  <div class="container">
    <!-- <h1>Gallery</h1> -->
    <h2>{{gallery.name}}</h2>
    <p><b>Created by:</b> {{gallery.user.first_name}} {{gallery.user.last_name}}</p>
    <p><b>Created at:</b> {{gallery.created_at}}</p>
    <p v-if="!!gallery.description">Description: {{gallery.description}}</p>

    <div id="demo" class="carousel slide" data-ride="carousel" >
        <!--Indicators -->
        <ul class="carousel-indicators">
  
          <li data-target="#demo" data-slide="next" class="active" v-for="n in gallery.images.length + 1" :key="n.index"></li>
        </ul> 

        <!--The slideshow -->
        <div class="carousel-inner">
          <div class="carousel-item active" >
            <img class="block img-fluid"   width="1024"
                height="480" :src="gallery.images[0].imageURL">
          </div>
          <div class="carousel-item " v-for="image in gallery.images" :key="image.id">
            <a :href="image.imageURL" target="_blank"><img class="block img-fluid" :src="image.imageURL"  width="1024"
                height="480"  :alt="image.imageURL"></a>

                <div class="carousel-caption d-none d-md-block">
                  <h5>...</h5>
                  <p>{{image.imageURL}}</p>
                </div>
          </div>
        </div>
        
        <!-- Left and right controls -->
        <a class="carousel-control-prev" href="#demo" data-slide="prev">
          <span class="carousel-control-prev-icon"></span>
        </a>
        <a class="carousel-control-next" href="#demo" data-slide="next">
          <span class="carousel-control-next-icon"></span>
        </a>
      </div>
    </div>
</template>

<script>

import galleryService from '../services/GalleryService';
export default {
  data() {
    return {
      id: this.$route.params.id,
      gallery: {},
      
      sliding: null
    }
  },

async created() {
        try {
            const data = await galleryService.getGallery(this.id);
            this.gallery = data;
             console.log(this.gallery.images.length);
        } catch (error) {
            console.log(error);
        }
    },

}
</script>

<style scoped>
 .carousel-inner img {
    width: 100%;
    height: 100%;
    /* max-height: 400px; */
  }
  .carousel {
    width: 50%;
  }
</style>