<template>
  <div class="home">
    <section class="inner_content discovery">
      <div class="discovery__container">
        <div class="discovery__wrapper">
          <div class="discovery__heading">
            <h2>Welcome,</h2>
            <h3>Millions of movies, TV shows and people to discover. Explore now.</h3>
          </div>
          <div class="discovery__search">
            <Searchbar class="discovery__search" v-model="query" @input="getResult(query)"></Searchbar>
            <ul class="dropdown-menu" :class="dropdownClasses">
              <li
                v-for="(suggestion, idx) in results"
                :key="idx"
                @click="suggestionClick(idx)"
                class="dropdown-menu__list"
              >
                <a class="dropdown-menu__item">{{ suggestion.title || suggestion.name }}</a>
              </li>
            </ul>
          </div>
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
            @cardClick="goToDetail"
          ></Card>
        </div>
      </div>
    </section>
    <section class="inner_content upcoming">
      <div class="upcoming__container">
        <div class="upcoming__heading">
          <h2>Upcoming</h2>
          <Tab
            :tabs="upcoming"
            :title="upcoming.name"
            @tabClick="upcomingCategory"
          ></Tab>
        </div>
        <div class="upcoming__wrapper">
          <Card
            class="upcoming__movie"
            :items="upcoming_movies"
            @cardClick="goToDetailUpcoming"
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
              @cardClick="triggerTrailer"
              :playbtn="true"
            ></Trailer>
          </div>
        </div>
      </div>
      <div v-if="modal">
        <div class="modal">
          <youtube
            :video-id="clicked_trailer"
            :style="modalStyle"
          />
          <div
            class="modal__close"
            @click="close"
          >
            <img class="modal__close-btn" src="../assets/close.svg" />
          </div>
        </div>
        <div class="modal__mask" @click="maskClick"></div>
      </div>
    </section>
    <section class="inner_content trending">
      <div class="trending__container">
        <div class="trending__heading">
          <h2>Trending</h2>
          <Tab
            :tabs="trending"
            :title="trending.name"
            @tabClick="trendingCategory"
          ></Tab>
        </div>
        <div class="trending__wrapper">
          <Card
            class="trending__movie"
            :items="trending_movies"
            @cardClick="goToDetailTrending"
          ></Card>
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
      trending_movies: [],
      upcoming_movies: [],
      youtube: [],
      trailer: [],
      results: [],
      movie_trailer: [],
      youtube_key_trailer: [],
      clicked_trailer: '',
      modal: false,
      backdrop: '/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg',
      tabIdx: '',
      items: [{
        name: 'Trending'
      }, {
        name: 'On TV'
      }, {
        name: 'Top rated'
      }],
      trending: [{
        name: 'Today'
      }, {
        name: 'This week'
      }],
      upcoming: [{
        name: 'Movies'
      }, {
        name: 'TV shows'
      }],
      active: false
    }
  },
  computed: {
    imageBackground () {
      return {
        backgroundImage: `url(${'https://image.tmdb.org/t/p/w500/' + this.backdrop})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        minHeight: '300px',
        height: 'calc(100vh / 5)',
        maxHeight: '360px',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat'
      }
    },
    modalStyle () {
      return {
        width: '100%',
        maxWidth: '500px',
        height: '300px'
      }
    },
    dropdownClasses () {
      return {
        'active': this.active
      }
    }
  },
  methods: {
    isActive(index) {
      return index === this.current;
    },
    goToDetail (idx) {
      if (this.movies[idx].media_type) {
        this.$router.push({name: 'movieDetail', params: { movieid: this.movies[idx].id, mediaType: this.movies[idx].media_type }})
      }
    },
    suggestionClick(index) {
      this.$router.push({name: 'movieDetail', params: { movieid: this.results[index].id, mediaType: 'movie' }})
    },
    goToDetailUpcoming (idx) {
      this.tabIdx
      if (this.tabIdx === 1) {
        this.$router.push({name: 'movieDetail', params: { movieid: this.upcoming_movies[idx].id, mediaType: 'tv' }})
      } else {
        this.$router.push({name: 'movieDetail', params: { movieid: this.upcoming_movies[idx].id, mediaType: 'movie' }})
      }
    },
    goToDetailTrending (idx) {
      if (this.trending_movies[idx].media_type) {
        this.$router.push({name: 'movieDetail', params: { movieid: this.trending_movies[idx].id, mediaType: 'this.trending_movies[idx].media_type' }})
      }
    },
    triggerTrailer (idx) {
      this.modal = true
      this.clicked_trailer = this.youtube_key_trailer[idx]
      this.backFreeze()
    },
    backFreeze () {
      document.querySelector('body').style.overflow = 'hidden'
    },
    backScroll () {
      document.querySelector('body').style.overflow = 'scroll'
    },
    maskClick () {
      this.modal = false
      this.backScroll()
    },
    close () {
      this.modal = false
      this.backScroll()
    },
    hover (path) {
      this.backdrop = path
    },
    getResult (query) {
      if (query) {
        axios.get('https://api.themoviedb.org/3/search/movie?api_key=b1277a04710552a426ddcd619c0256bf&query=' + query).then(
          response => {
            this.results = response.data.results
            if (this.results.length < 1) {
              this.active = false
            }
            this.active = true
          })
      } else {
        this.active = false
      }
    },
    popularCategory (selectedIndex) {
      this.tabIdx = selectedIndex
      if (selectedIndex === 1) {
        axios.get('https://api.themoviedb.org/3/trending/tv/week?api_key=b1277a04710552a426ddcd619c0256bf').then(
          response => {
            this.movies = response.data.results
          }).catch(error => {
          console.log(error)
        })
      } else if (selectedIndex === 2) {
        axios.get('https://api.themoviedb.org/3/trending/tv/week?api_key=b1277a04710552a426ddcd619c0256bf').then(
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
    trendingCategory (selectedIndex) {
      this.tabIdx = selectedIndex
      if (selectedIndex === 1) {
        axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=b1277a04710552a426ddcd619c0256bf').then(
          response => {
            this.trending_movies = response.data.results
          }).catch(error => {
          console.log(error)
        })
      } else {
        axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=b1277a04710552a426ddcd619c0256bf').then(
          response => {
            this.trending_movies = response.data.results
          }).catch(error => {
          console.log(error)
        })
      }
    },
    upcomingCategory (selectedIndex) {
      this.tabIdx = selectedIndex
      if (selectedIndex === 1) {
        axios.get('https://api.themoviedb.org/3/tv/airing_today?api_key=b1277a04710552a426ddcd619c0256bf').then(
          response => {
            this.upcoming_movies = response.data.results
          }).catch(error => {
          console.log(error)
        })
      } else {
        axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=b1277a04710552a426ddcd619c0256bf').then(
          response => {
            this.upcoming_movies = response.data.results
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
        }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.popularCategory()
    this.trendingCategory()
    this.upcomingCategory()
    this.getTrailer()
    this.getMovieTrailer()
    this.tabIdx = 0
  },
  created () {
  }
}
</script>
<style lang="scss" scoped>
@import '@/globalSCSS/globalvar.scss';
.dropdown-menu {
  position: relative;
  display: block;
  padding: 24px 10px 8px;
  border-radius: 8px;
  background: #fff;
  z-index: 1;
  max-height: 150px;
  height: auto;
  overflow-y: auto;
  box-shadow: $shadow;
  width: 90%;
  display: none;
  max-width: 932px;
  &__list {
    display: grid;
    list-style: none;
    margin-left: 16px;
    border-top: $accountSilver 1px solid;
    padding: 8px 0px;
    &:first-child { border-top: none; }
  }
  &__item {
    text-decoration: none;
    color: $font-color-1;
    cursor: pointer;
    &:hover {
      color: $accountTeal;
    }
  }
&.active {
  display: block;
}
}
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
    @media only screen and (max-width: 800px) {
      padding: 30px 24px;
    }
  }
  &__search {
    width: 95%;
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

.upcoming {
  max-width: 1400px;
  @media only screen and (min-width: 1400px) {
    max-width: $max-width;
  }
  &__container {
    width: -webkit-fill-available;
    padding: 15px 56px 30px;
    @media only screen and (max-width: 800px) {
      padding: 10px 24px 30px;
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
    height: 200px;
    @media only screen and (max-width: 800px) {
      height: 220px;
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

.trending {
  max-width: 1400px;
  @media only screen and (min-width: 1400px) {
    max-width: $max-width;
  }
  &__container {
    width: -webkit-fill-available;
    padding: 30px 56px;
    @media only screen and (max-width: 800px) {
      padding: 10px 24px 30px;
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

.modal {
  background: $tmdbBlack;
  border-radius: $imageBorderRadius;
  box-shadow: $shadow;
  width: 90%;
  max-width: 500px;
  transform: translate(-50%,-50%);
  height: 300px;
  top: 50%;
  left: 50%;
  height: 300px;
  position: fixed;
  z-index: 1000;
  &__mask {
    transition: opacity .3s ease;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .64);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(4px);
  }
  &__close {
    position: absolute;
    right: 0;
    top: -15%;
    z-index: 2000;
    &-btn {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }
}
</style>
