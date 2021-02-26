<template>
  <div class="nav">
    <div class="nav-box">
      <span class="navbar-brand mb-0 h1"><b>AppGallery</b></span>
      <router-link to="/">All Galleries</router-link> |
      <router-link v-if="!!isAuthenticated" to="/my-galleries">My Galleries</router-link> |
      <router-link v-if="!!isAuthenticated" to="/create">Create New Gallery</router-link>
    </div>
  
    <div class="nav-box">
      <template v-if="!isAuthenticated">
        <router-link to="/register">Register</router-link> |
        <router-link to="/login">Login</router-link>
      </template>
      <template v-else>
        <a class="button" @click="logout">Logout</a>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {

  name: 'nav-bar',
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
  },
  methods: {
    ...mapActions('auth', ['logout']),
    },
          
};
</script>
<style scoped>
.nav {
  display: flex;
  padding: 30px;
}

.nav-box {
  flex: 1;
}
.nav a {
  font-weight: bold;
  color: #2c3e50;
}

.nav a.router-link-exact-active {
  color: #0184ff;
}
.button {
  cursor: pointer;
}
</style>
