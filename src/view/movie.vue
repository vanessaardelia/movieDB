<template>
  <section class="inner_content popular">
    <div class="popular__container">
      <div class="popular__heading">
      </div>
      <div class="popular__wrapper">
        <Card
          class="popular__movie"
          :items="results"
          @cardClick="goToDetail"
        ></Card>
      </div>
    </div>
  </section>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
import Card from '@/components/Card/Card'

export default {
  name: 'movie',
  components: {
    Card
  },
  data () {
    return {
      query: '',
      results: []
    }
  },
  methods: {
    getResult (query) {
      if (query !== 'all_movies' && query !== 'all_tv') {
        axios.get('https://api.themoviedb.org/3/search/movie?api_key=b1277a04710552a426ddcd619c0256bf&query=' + query).then(
          response => {
            this.results = response.data.results          
          })
      } else if (query === 'all_movies') {
        var today = new Date()
        var dd = String(today.getDate()).padStart(2, '0')
        var mm = String(today.getMonth() + 1).padStart(2, '0')
        var yyyy = today.getFullYear()
        today = yyyy + '-' + mm + '-' + dd
        axios.get('https://api.themoviedb.org/3/discover/movie?api_key=b1277a04710552a426ddcd619c0256bf&sort_by=release_date.desc&include_adult=false&release_date.lte=' + today + '&page=1').then(
          response => {
            this.results = response.data.results          
          })
      } else if (query === 'all_tv') {
        var today = new Date()
        var dd = String(today.getDate()).padStart(2, '0')
        var mm = String(today.getMonth() + 1).padStart(2, '0')
        var yyyy = today.getFullYear()
        today = yyyy + '-' + mm + '-' + dd
        axios.get('https://api.themoviedb.org/3/discover/tv?api_key=b1277a04710552a426ddcd619c0256bf&sort_by=release_date.desc&include_adult=false&release_date.lte=' + today + '&page=1').then(
          response => {
            this.results = response.data.results          
          })
      }
    },
    goToDetail (idx) {
      this.$router.push({name: 'movieDetail', params: { movieid: this.results[idx].id, mediaType: 'movie' }})
    },
  },
  mounted () {
    this.query = this.$route.params.query
    this.getResult(this.query)
  }
}
</script>
<style lang="scss" scoped>
@import '@/globalSCSS/globalvar.scss';
.inner_content {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  margin: auto;
}

.popular {
  max-width: 1400px;
  @media only screen and (min-width: 1400px) {
    max-width: $max-width;
  }
  &__container {
    width: -webkit-fill-available;
    padding: 30px 56px;
    @media only screen and (max-width: 800px) {
      padding: 30px 24px 10px;
    }
  }
  &__heading {
    display: flex;
    align-items: center;
    gap: 12px;
    @media only screen and (max-width: 800px) {
      flex-direction: column;
      gap: 0px;
    }
  }
  &__movie {
    gap: 16px;
    flex-wrap: wrap;
    display: flex;
    @media only screen and (max-width: 800px) {
      gap: 8px;
    }
  }
}
</style>