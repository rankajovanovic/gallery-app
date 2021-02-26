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


     <div class="comments-section">
      <h5>Comments: </h5>

    <div v-if="isAuthenticated" class="pb-5">
      <form @submit.prevent="handleAddComment">
        <div class="form-group">
          <textarea v-model="comment.body" id="" cols="10" rows="7" placeholder="Share your feedback and comments!" required></textarea>
          <p class="alert alert-danger" v-if="errors.body">{{errors.body[0]}}</p>
        </div>
        <button type="submit" class="btn btn-info">Submit</button>
      </form>
    </div>



      <ul class="list-group">

        <li class="list-group-item" v-for="comment in gallery.comments" :key="comment.id">
          <p>{{comment.body}}</p>
          <p>Commented by: {{comment.user.first_name}} {{comment.user.last_name}}</p>
          <small>{{comment.created_at | diffForHumans}}</small>

          <div v-if="comment.user_id === userId">
            <button @click="deleteComment(comment.id, index)" class="btn ">
              <i class="bi bi-trash-fill" width="20" height="20" ></i>
            </button>
          
          </div>
        </li>

      </ul>


    </div>


    </div>
</template>

<script>
import commentService from "./../services/CommentService.js";
import { mapGetters } from "vuex";
import galleryService from '../services/GalleryService';
import { mixins } from "../mixins/DateMixin.js";
export default {
    mixins: [mixins],
    computed: 
	{
    ...mapGetters("auth", ["isAuthenticated"])   
	},
  data() {
    return {
      id: this.$route.params.id,
      gallery: {
        comments: []
      },
      body: "",
      errors: [],
       userId: localStorage.getItem('user_id'),

       
      comment: {
        body: "", 
        user_id: localStorage.getItem('user_id'),
        gallery_id: this.$route.params.id,
      },

    }
  },
methods: {
   async handleAddComment() {
     try {
        const {data} = await commentService.addComment(this.comment)
        console.log(data);
     } catch(e) {
       alert('Not able to create the comment.')
     }
     
        // .then(response => {
        //   this.gallery.comments.push(response.data[0]);
        //   this.body = "";
        // })
        // .catch(error => {
        //   this.errors = error.response.data.errors;
        // });
      
    },
   deleteGallery() {
      if (confirm("Are you sure you want to delete gallery?")) {
        galleryService.delete(this.gallery.id).then(() => {
          this.$router.push({ name: "all-galleries" });
        });
      }
    },
    deleteComment(id, index) {
      if (confirm("Are you sure you want to delete comment?")) {
        commentService.delete(id).then(() => {
          this.gallery.comments.splice(index, 1);
        });
      }
    },
},
async created() {
        try {
            const data = await galleryService.getGallery(this.id);
            this.gallery = data;
        } catch (error) {
            console.log(error);
        }
    },

}
</script>

<style scoped>
.comments-section {
  margin: 0 auto;
  margin-top: 10%;
  max-width: 600px;
  background-color: none;
}

.list-group-item {
  background-color: transparent !important;
  border-bottom: #48494b solid 2px !important;
}

.form-group {
  margin-top: 3% !important;
}

textarea {
  width: 600px;
}
</style>