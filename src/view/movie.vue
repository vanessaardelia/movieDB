<template>
  <section class="inner_content movie">
    <div class="movie__container">
      <div class="movie__heading">
      </div>
      <div class="movie__wrapper">
        <Card
          class="movie__movie"
          :items="results"
          @cardClick="goToDetail"
        ></Card>
        <paginate
          v-if="query === 'all_movies' || query === 'all_tv'"
          :pageCount="10"
          :containerClass="'pagination'"
          :clickHandler="clickCallback"
        >
      </paginate>
      </div>
    </div>
  </section>
</template>
<script>
import axios from 'axios'
import Card from '@/components/Card/Card'
import Paginate from 'vuejs-paginate'

export default {
  name: 'movie',
  components: {
    Card,
    Paginate
  },
  data () {
    return {
      query: '',
      results: [],
      movieType: '',
      currentPage: 1
    }
  },
  watch: {
  },
  methods: {
    clickCallback (page) {
      this.currentPage = page
      this.getResult(this.query, this.currentPage)
    },
    getResult (query, page) {
      var today = new Date()
      var dd = String(today.getDate()).padStart(2, '0')
      var mm = String(today.getMonth() + 1).padStart(2, '0')
      var yyyy = today.getFullYear()
      today = yyyy + '-' + mm + '-' + dd
      if (query !== 'all_movies' && query !== 'all_tv') {
        axios.get('https://api.themoviedb.org/3/search/movie?api_key=b1277a04710552a426ddcd619c0256bf&query=' + query).then(
          response => {
            this.results = response.data.results
            this.movieType = 'movie'
          })
      } else if (query === 'all_movies') {
        axios.get('https://api.themoviedb.org/3/discover/movie?api_key=b1277a04710552a426ddcd619c0256bf&sort_by=release_date.desc&include_adult=false&release_date.lte=' + today + '&page=' + this.currentPage).then(
          response => {
            this.results = response.data.results
            this.movieType = 'movie'
          })
      } else if (query === 'all_tv') {
        axios.get('https://api.themoviedb.org/3/discover/tv?api_key=b1277a04710552a426ddcd619c0256bf&sort_by=vote_average.desc&include_adult=false&release_date.lte=' + today + '&page=' + this.currentPage).then(
          response => {
            this.results = response.data.results
            this.movieType = 'tv'
          })
      }
    },
    goToDetail (idx) {
      this.$router.push({name: 'movieDetail', params: { movieid: this.results[idx].id, mediaType: this.movieType }})
    }
  },
  mounted () {
    this.query = this.$route.params.query
    this.getResult(this.query, this.currentPage)
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

.pagination {
  display: flex;
  list-style-type: none;
  padding: 0;
  gap: 4px;
  color: $font-color-1;
  @media only screen and (max-width: 800px) {
    transform: scale(0.8);
    margin-left: -24px;
  }
}

/deep/ li {
  padding: 4px;
  border: .5px solid rgba($tmdbDarkBlue, 1);
  border-radius: $imageBorderRadius;
  min-width: 14px;
}

/deep/ li.active {
  background: $tmdbDarkBlue;
  color: white;
}

/deep/ li.disabled {
  color: $darkerGrey;
  border: .5px solid rgba($darkerGrey, 1);
}

.movie {
  max-width: 1400px;
  @media only screen and (min-width: 1400px) {
    max-width: $max-width;
  }
  &__container {
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
    @media only screen and (max-width: 500px) {
      gap: 16px;
    }
  }
}
</style>
