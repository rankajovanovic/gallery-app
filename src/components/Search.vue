  
<template>
  <div>
    <form class="form-inline" @submit.prevent="handleSearch">
      <input
        class="form-control"
        type="search"
        placeholder="Search galleries..."
        v-model="search"
      />
      <button class="btn btn-outline-primary" type="submit">Search</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
    };
  },
  methods: {
    handleSearch() {
      this.$emit("handleSearch", this.search);
    },
  },
};
</script>