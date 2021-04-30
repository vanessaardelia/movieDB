<template>
  <div class="home">
    <section class="discovery">
      <Searchbar class="discovery__search" v-model="query" @input="getResult(query)"></Searchbar>
    </section>
  </div>
</template>

<script>
import Searchbar from '@/components/Searchbar/Searchbar'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    Searchbar
  },
  data () {
    return {
      query: ''
    }
  },
  methods: {
    getResult (query) {
      if (query) {
        axios.get('https://api.themoviedb.org/3/search/movie?api_key=b1277a04710552a426ddcd619c0256bf&query=' + query).then(
          response => {
            this.results = response.data.results
          })
        console.log(this.results)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '@/globalSCSS/globalvar.scss';
.discovery {
  background-image: linear-gradient(to right, rgba($tmdbDarkBlue, 0.8) 0%, rgba($tmdbDarkBlue, 0) 100%), url('../assets/movie-banner.jpg');
  min-height: 300px;
  height: calc(100vh / 2.5);
  max-height: 360px;
  &__search {
    max-width: $max-width;
  }
}
</style>
