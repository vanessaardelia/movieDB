<template>
  <div class="home">
    <section class="inner_content discovery">
      <div class="discovery__container">
        <div class="discovery__wrapper">
          <div class="discovery__heading">
            <h2>Welcome,</h2>
            <h3>Millions of movies, TV shows and people to discover. Explore now.</h3>
          </div>
          <Searchbar class="discovery__search" v-model="query" @input="getResult(query)"></Searchbar>
        </div>
      </div>
    </section>
    <section class="inner_content popular">
      <div class="popular__container">
        <div class="popular__heading">
          <h2>What's Popular</h2>
          <Tab
            :tabs="items"
            :title="items.name"
            @tabClick="popularCategory"
          ></Tab>
        </div>
        <div class="popular__wrapper">
          <Card
            class="popular__movie"
            :items="movies"
          ></Card>
        </div>
      </div>
    </section>
    <section class="inner_content trailer bg-img" :style="imageBackground">
      <div class="trailer__container">
        <div class="trailer__heading">
          <h2 class="trailer__heading-text">Latest Trailers</h2>
        </div>
        <div>
          <div class="trailer__wrapper">
            <Trailer
              class="trailer__movie"
              :items="movie_trailer"
              @hover="hover"
            ></Trailer>
          </div>
        </div>
      </div>
    </section>
    <section class="inner_content popular">
      <div class="popular__container">
        <div class="popular__heading">
          <h2>What's Popular</h2>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Searchbar from '@/components/Searchbar/Searchbar'
import Tab from '@/components/Tab/Tab'
import Card from '@/components/Card/Card'
import Trailer from '@/components/Trailer/Trailer'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    Searchbar, Tab, Card, Trailer
  },
  data () {
    return {
      query: '',
      idx: 0,
      movies: [],
      youtube: [],
      trailer: [],
      movie_trailer: [],
      youtube_key_trailer: [],
      backdrop: '/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg',
      tabIdx: '',
      items: [{
        name: 'Trending'
      }, {
        name: 'On TV'
      }, {
        name: 'Top rated'
      }, {
        name: 'In theatres'
      }]
    }
  },
  computed: {
    imageBackground() {
      return {
        backgroundImage: `url(${'https://image.tmdb.org/t/p/w500/' + this.backdrop})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        minHeight: '300px',
        height: 'calc(100vh / 2.5)',
        maxHeight: '360px',
        backgroundPosition: 'top center',
        backgroundRepeat:'no-repeat'
      }
    }
  },
  methods: {
    hover (path) {
      this.backdrop = path
    },
    getResult (query) {
      if (query) {
        axios.get('https://api.themoviedb.org/3/search/movie?api_key=b1277a04710552a426ddcd619c0256bf&query=' + query).then(
          response => {
            this.results = response.data.results
          })
      }
    },
    popularCategory (selectedIndex) {
      if (selectedIndex === 1) {
        axios.get('https://api.themoviedb.org/3/trending/tv/week?api_key=b1277a04710552a426ddcd619c0256bf').then(
          response => {
            this.movies = response.data.results
          }).catch(error => {
          console.log(error)
        })
      } else if (selectedIndex === 3) {
        axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=b1277a04710552a426ddcd619c0256bf').then(
          response => {
            this.movies = response.data.results
          }).catch(error => {
          console.log(error)
        })
      } else if (selectedIndex === 2) {
        axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=b1277a04710552a426ddcd619c0256bf').then(
          response => {
            this.movies = response.data.results
          }).catch(error => {
          console.log(error)
        })
      } else {
        axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=b1277a04710552a426ddcd619c0256bf').then(
          response => {
            this.movies = response.data.results
          }).catch(error => {
          console.log(error)
        })
      }
    },
    getMovieTrailer () {
      axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=b1277a04710552a426ddcd619c0256bf').then(
        response => {
          this.movie_trailer = response.data.results
        }).catch(error => {
        console.log(error)
      })
    },
    getTrailer () {
      axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=b1277a04710552a426ddcd619c0256bf').then(
        response => {
          this.movies = response.data.results
          this.movies.map(movie => {
            let id = movie.id
            this.trailer.push(id)
          })
          this.trailer.forEach(trailer => {
            axios.get('https://api.themoviedb.org/3/movie/' + trailer + '/videos?api_key=b1277a04710552a426ddcd619c0256bf').then(
              response => {
                this.trailer_id = response.data.results[0] // 1 movie terdiri dari banyak trailer, aku ambil trailer pertama saja
                this.youtube_key_trailer.push(this.trailer_id.key)
              }).catch(error => {
              console.log(error)
            })
          })
          console.log(this.youtube_key_trailer)
        }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.popularCategory()
    this.getTrailer()
    this.getMovieTrailer()
  },
  created () {
  }
}
</script>
<style lang="scss" scoped>
@import '@/globalSCSS/globalvar.scss';
.home {
  display: flex;
  flex-direction: column;
  margin: auto;
}

.inner_content {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  margin: auto;
}

.bg-img{
  transition: all 0.5s;
}

.discovery {
  background-image: linear-gradient(to right, rgba($tmdbDarkBlue, 0.8) 40%, rgba($tmdbDarkBlue, 0) 100%), url('../assets/movie-banner.jpg');
  min-height: 300px;
  height: calc(100vh / 2.5);
  max-height: 360px;
  background-position: top center;
  background-size: cover;
  background-repeat: no-repeat;
  max-width: 1400px;
  @media only screen and (min-width: 1400px) {
    max-width: $max-width;
  }
  &__container {
    width: 100%;
    display: flex;
  }
  &__wrapper {
    max-width: 1400px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 30px 56px;
    text-align: left;
  }
  &__heading {
    color: $tmdbWhite;
  }
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
      padding: 30px 24px;
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
  &__wrapper {
    overflow-x: auto;
    overflow-y: hidden;
    @media only screen and (max-width: 800px) {
      margin-top: 24px;
    }
  }
  &__movie {
    display: inline-flex;
    gap: 16px;
    @media only screen and (max-width: 800px) {
      gap: 8px;
    }
  }
}

.trailer {
  max-width: 1400px;
  @media only screen and (min-width: 1400px) {
    max-width: $max-width;
  }
  &__container {
    width: -webkit-fill-available;
    padding: 30px 56px;
    background: linear-gradient(to right, rgba($tmdbDarkBlue, 0.75) 0%, rgba($tmdbDarkBlue, 0.75) 100%);
    @media only screen and (max-width: 800px) {
      padding: 10px 24px 30px;
    }
  }
  &__heading {
    display: flex;
    align-items: center;
    &-text {
      color: $tmdbWhite;
    }
  }
  &__wrapper {
    overflow-x: auto;
    overflow-y: hidden;
  }
  &__movie {
    display: inline-flex;
    gap: 16px;
    @media only screen and (max-width: 800px) {
      gap: 8px;
    }
  }
}
</style>
