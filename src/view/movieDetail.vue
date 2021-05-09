<template>
  <div class="movieDetail">
    <section class="inner_content preview">
      <div :style="imageBackground">
        <div class="preview__container">
          <div class="preview__wrapper">
            <div class="preview__poster">
              <img :src="cardImage(details.poster_path)" />
            </div>
            <div class="preview__content">
              <div class="preview__heading">
                <VuePercentageCircle
                  class="score" :size="circleSize" :animate="true" :active-color="percentColor" complete-color="green" :percent="vote_average"
                ></VuePercentageCircle>
                <div class="preview__heading-wrapper">
                  <h2 class="preview__title">{{ details.title || details.name }}<span class="preview__title-year">{{ ' (' + release_year + ')' }}</span></h2>
                  <div class="preview__content-runtime">
                    <span v-if="mediaType === 'movie'" class="preview__content-certification">{{ certification }}</span>
                    <span class="preview__content-releasedate">{{ releaseDate }}</span>
                    <div
                      class="preview__content-genre"
                    >
                      <span
                        v-for="(genre, idx) in details.genres"
                        :key="idx"
                      >
                        {{ genre.name }}
                      </span>
                    </div>
                    <span class="preview__content-duration">{{ runtime }}</span>
                  </div>
                </div>
              </div>
              <p class="preview__content-tagline">{{ details.tagline }}</p>
              <h4 class="preview__content-title">Overview</h4>
              <span class="preview__content-overview">{{ details.overview }}</span>
              <div class="preview__list">
                <div
                  v-for="(crew_name, idx2) in crewName"
                  :key="idx2"
                  class="preview__list-crew"
                >
                  <span class="preview__list-title"><b>{{ crew_name.name }}</b></span>
                  <div
                    class="preview__list-subtitle"
                  >
                    <span
                      v-for="(job, idx2) in crew_name.job"
                      :key="idx2"
                    >
                      {{ job }}
                    </span>
                  </div>
                </div>
                <div v-if="mediaType === 'tv'">
                  <div
                    v-for="(crew_name, idx2) in details.created_by"
                    :key="idx2"
                    class="preview__list-crew"
                  >
                    <span class="preview__list-title"><b>{{ crew_name.name }}</b></span>
                    <span class="preview__list-subtitle">Creator</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section v-if="cast.length > 0" class="inner_content cast">
      <div class="cast__container">
        <div class="cast__heading">
          <h2>Cast</h2>
        </div>
        <div class="cast__outerwrapper">
          <div class="cast__wrapper">
            <div class="cast__casts">
              <div class="card"
                v-for="(cast_name, idx2) in cast"
                :key="idx2"
              >
                <img :src="cardImage(cast_name.profile_path)">
                <div class="card__content">
                  <p class="title">{{ cast_name.name }}</p>
                  <p class="subtitle">{{ cast_name.character }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section v-if="review.length > 0" class="inner_content social">
      <div class="social__container">
        <div class="social__heading">
          <h2 class="social__heading-text">Social</h2>
        </div>
        <div class="social__wrapper">
          <ReviewCard
            :items="review"
            class="social__card"
          >
          </ReviewCard>
          <h3 v-if="allReview.length > 1" @click="goToReview(movieId, mediaType)">Read all reviews</h3>
        </div>
      </div>
    </section>
    <section v-if="youtube_key.length > 0" class="inner_content trailer bg-img" :style="imageBackground">
      <div class="trailer__container">
        <div class="trailer__heading">
          <h2 class="trailer__heading-text">Trailers</h2>
        </div>
        <div class="cast__outerwrapper">
          <div class="cast__wrapper">
            <div class="cast__casts">
              <div
                class="trailer__movie"
                v-for="(trailer, idx2) in youtube_key"
                :key="idx2"
              >
                <div class="mobile-card" @click="triggerTrailer(idx2)">
                  <h6 class="title"> {{ details.title || details.name }} trailer {{ idx2 }} </h6>
                  <img class="playbtn" src="../assets/play.svg" />
                  <img class="backdrop" :src="cardImage(details.backdrop_path)"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="modal">
          <div class="modal">
            <youtube
              :video-id="key"
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
      </div>
    </section>
    <section v-if="recommendations.length > 0" class="inner_content recommendation">
      <div class="recommendation__container">
        <div class="recommendation__heading">
          <h2 class="recommendation__heading-text">Recommendations</h2>
        </div>
        <div class="recommendation__outerwrapper">
          <div class="recommendation__wrapper">
            <Trailer
              class="recommendation__movie"
              :items="recommendations"
              @cardClick="goToDetails"
            ></Trailer>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
import VuePercentageCircle from 'vue-css-percentage-circle'
import Trailer from '../components/trailer/trailer'
import ReviewCard from '../components/reviewCard/reviewCard'

export default {
  name: 'movieDetail',
  components: {
    VuePercentageCircle,
    Trailer,
    ReviewCard
  },
  data () {
    return {
      movieId: '',
      mediaType: '',
      vote_average: 0,
      screenWidth: 0,
      details: [],
      credits: [],
      review: [],
      allReview: [],
      release_year: '',
      certification: '',
      recommendations: [],
      percentColor: 'orange',
      circleSize: 'large',
      youtube_key: [],
      trailer_key: [],
      runtime: '',
      releaseDate: '',
      screenplay: [],
      crew: [],
      cast: [],
      crewName: [],
      job: [],
      modal: false,
      key: ''
    }
  },
  computed: {
    imageBackground () {
      return {
        backgroundImage: `url(${'https://image.tmdb.org/t/p/w500/' + this.details.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
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
    }
  },
  methods: {
    goToDetails (idx) {
      this.$router.push({name: 'movieDetail', params: { movieid: this.recommendations[idx].id, mediaType: this.mediaType }})
      window.location.reload(true)
      window.scrollTo(0, 0)
    },
    goToReview (reviewId, mediaType) {
      this.$router.push({name: 'reviewDetail', params: { movieId: reviewId, mediaType: mediaType }})
    },
    getDetails (movieId, mediaType) {
      if (mediaType === 'movie') {
        axios.get('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=b1277a04710552a426ddcd619c0256bf').then(
          response => {
            this.details = response.data
            this.format_date(this.details.release_date)
            this.running_time(this.details.runtime)
            this.releaseDate = moment(String(this.details.release_date)).format('DD/MM/YYYY')
            this.vote_average = this.details.vote_average * 10
            if (this.vote_average > 50) {
              this.percentColor = 'green'
            }
          })
        axios.get('https://api.themoviedb.org/3/movie/' + movieId + '/release_dates?api_key=b1277a04710552a426ddcd619c0256bf').then(
          response => {
            response.data.results.map(iso => {
              if (iso.iso_3166_1 === 'US') {
                this.certification = iso.release_dates[0].certification
              }
            })
          })
      } else {
        axios.get('https://api.themoviedb.org/3/tv/' + movieId + '?api_key=b1277a04710552a426ddcd619c0256bf').then(
          response => {
            this.details = response.data
            this.format_date(this.details.last_air_date)
            this.running_time(this.details.episode_run_time)
            this.releaseDate = moment(String(this.details.first_air_date)).format('DD/MM/YYYY')
            this.vote_average = this.details.vote_average * 10
            if (this.vote_average > 50) {
              this.percentColor = 'green'
            }
          })
      }
    },
    cardImage (fileName) {
      if (fileName) {
        var d = fileName
        return 'https://image.tmdb.org/t/p/w500/' + d
      } else {
        return require(`../assets/male_cast.jpg`)
      }
    },
    format_date (value) {
      if (value) {
        this.release_year = moment(String(value)).format('YYYY')
      }
    },
    running_time (value) {
      if (value) {
        const startTime = '00:00:00'
        this.runtime = moment(startTime, 'HH:mm:ss').add(value, 'minutes').format('H [h] mm [m]')
      }
    },
    getTrailer (movieId, mediaType) {
      if (mediaType === 'movie') {
        axios.get('https://api.themoviedb.org/3/movie/' + movieId + '/videos?api_key=b1277a04710552a426ddcd619c0256bf').then(
          response => {
            response.data.results.map(data => {
              this.youtube_key.push(data)
              this.youtube_key.map(keys => {
                this.trailer_key.push(keys.key)
              })
            })
          }).catch(error => {
          console.log(error)
        })
      } else {
        axios.get('https://api.themoviedb.org/3/tv/' + movieId + '/videos?api_key=b1277a04710552a426ddcd619c0256bf').then(
          response => {
            response.data.results.map(data => {
              this.youtube_key.push(data)
              this.youtube_key.map(keys => {
                this.trailer_key.push(keys.key)
              })
            })
          }).catch(error => {
          console.log(error)
        })
      }
    },
    getCredit (movieId, mediaType) {
      if (mediaType === 'movie') {
        axios.get('https://api.themoviedb.org/3/movie/' + movieId + '/credits?api_key=b1277a04710552a426ddcd619c0256bf').then(
          response => {
            this.credits = response.data
            // GET CREW
            this.crew = this.credits.crew.map((crew, idx) => {
              if (crew.job === 'Writer' || crew.job === 'Story' || crew.job === 'Director' || crew.job === 'Screenplay' || crew.job === 'Characters') {
                this.crewName.push(crew)
              }
            })
            this.crewName = this.crewName.reduce((arr, item) => {
              const existing = arr.find(innerItem => innerItem.id === item.id)
              if (existing) {
                existing.job = Array.isArray(existing.job) ? existing.job : [existing.job]
                existing.job.push(item.job)
              } else {
                arr.push(item)
              }
              return arr
            }, [])
            this.crewName = this.crewName.reduce((arr, item) => {
              const onejob = Array.isArray(item.job)
              if (!onejob) {
                item.job = Array.isArray(item.job) ? item.job : [item.job]
                arr.push(item)
              } else {
                arr.push(item)
              }
              return arr
            }, [])
            // GET CAST
            this.cast = this.credits.cast
          })
      } else {
        axios.get('https://api.themoviedb.org/3/tv/' + movieId + '/credits?api_key=b1277a04710552a426ddcd619c0256bf').then(
          response => {
            this.credits = response.data
            // GET CREW
            this.crew = this.credits.crew.map((crew, idx) => {
              if (crew.job === 'Writer' || crew.job === 'Story' || crew.job === 'Director' || crew.job === 'Screenplay' || crew.job === 'Characters' || crew.job === 'Creator') {
                if (this.credits.hasOwnProperty('created_by')) {
                  this.crewName.push(crew.created_by)
                } else {
                  this.crewName.push(crew)
                }
              }
            })
            this.crewName = this.crewName.reduce((arr, item) => {
              const existing = arr.find(innerItem => innerItem.id === item.id)
              if (existing) {
                existing.job = Array.isArray(existing.job) ? existing.job : [existing.job]
                existing.job.push(item.job)
              } else {
                arr.push(item)
              }
              return arr
            }, [])
            this.crewName = this.crewName.reduce((arr, item) => {
              const onejob = Array.isArray(item.job)
              if (!onejob) {
                item.job = Array.isArray(item.job) ? item.job : [item.job]
                arr.push(item)
              } else {
                arr.push(item)
              }
              return arr
            }, [])
            // GET CAST
            this.cast = this.credits.cast
          })
      }
    },
    getRecommendation (movieId, mediaType) {
      if (mediaType === 'movie') {
        axios.get('https://api.themoviedb.org/3/movie/' + movieId + '/similar?api_key=b1277a04710552a426ddcd619c0256bf').then(
          response => {
            response.data.results.map(movie => {
              if (movie.backdrop_path) {
                this.recommendations.push(movie)
              }
            })
          }).catch(error => {
          console.log(error)
        })
      } else {
        axios.get('https://api.themoviedb.org/3/tv/' + movieId + '/similar?api_key=b1277a04710552a426ddcd619c0256bf').then(
          response => {
            response.data.results.map(tv => {
              if (tv.backdrop_path) {
                this.recommendations.push(tv)
              }
            })
          }).catch(error => {
          console.log(error)
        })
      }
    },
    getReview (movieId, mediaType) {
      if (mediaType === 'movie') {
        axios.get('https://api.themoviedb.org/3/movie/' + movieId + '/reviews?api_key=b1277a04710552a426ddcd619c0256bf').then(
          response => {
            if (response.data.results.length > 0) {
              this.review.push(response.data.results[0])
              this.allReview = response.data.results
            }
          }).catch(error => {
          console.log(error)
        })
      } else {
        axios.get('https://api.themoviedb.org/3/tv/' + movieId + '/reviews?api_key=b1277a04710552a426ddcd619c0256bf').then(
          response => {
            if (response.data.results.length > 0) {
              this.review.push(response.data.results[0])
              this.allReview = response.data.results
            }
          }).catch(error => {
          console.log(error)
        })
      }
    },
    setupWidth () {
      this.screenWidth = window.innerWidth
      if (this.screenWidth < 900) {
        this.circleSize = 'medium'
      }
    },
    ended () {
      this.$refs.player.player.seekTo(0)
    },
    triggerTrailer (idx) {
      this.modal = true
      this.key = this.trailer_key[idx]
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
    }
  },
  mounted () {
    this.movieId = this.$route.params.movieid
    this.mediaType = this.$route.params.mediaType
    this.setupWidth()
    this.getDetails(this.movieId, this.mediaType)
    this.getTrailer(this.movieId, this.mediaType)
    this.getCredit(this.movieId, this.mediaType)
    this.getRecommendation(this.movieId, this.mediaType)
    this.getReview(this.movieId, this.mediaType)
    window.scrollTo(0, 0)
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

.preview {
  display: flex;
  flex-direction: column;
  margin: auto;
  &__heading {
    display: flex;
    gap: 24px;
    @media only screen and (max-width: 800px) {
      justify-content: center;
      gap: 16px;
      margin-top: 24px;
    }
    @media only screen and (max-width: 400px) {
      text-align: center;
      flex-direction: column;
      .score {
        position: absolute;
        bottom: 80px;
        z-index: 100;
        left: calc(100% - 30%);
      }
    }
    @media only screen and (max-width: 500px) {
      text-align: center;
      flex-direction: column;
      .score {
        position: absolute;
        bottom: 560px;
        z-index: 100;
        left: calc(100% - 35%);
      }
    }
    &-wrapper {
      align-self: center;
    }
  }
  &__title {
    font-size: 28px;
    margin-bottom: 8px;
    margin-top: 0;
    &-year {
      opacity: 0.8;
      font-weight: 400;
    }
    @media only screen and (max-width: 800px) {
      font-size: 20px;
    }
  }
  &__content {
    text-align: left;
    color: $tmdbWhite;
    align-self: center;
    &-certification {
      border: 1px solid rgba(255,255,255,0.6);
      color: rgba(255,255,255,0.6);
      margin-right: 8px;
      padding: 1px 2px;
      width: fit-content;
      @media only screen and (max-width: 400px) {
        order: 1;
        flex-basis: 5%;
      }
    }
    &-genre {
      span:first-child {
        &::before {
          content: " ";
        }
      }
      span:nth-of-type(n + 1):not(:first-child) {
        &::before {
          content: ", ";
        }
      }
      @media only screen and (max-width: 400px) {
        order: 2;
      }
    }
    &-runtime {
      font-size: 12px;
      display: flex;
      @media only screen and (max-width: 500px) {
        flex-wrap: wrap;
        gap: 8px;
        justify-content: center;
        align-items: center;
      }
    }
    &-overview {
      font-size: 14px;
    }
    &-title {
      margin-bottom: 8px;
    }
    &-tagline {
      margin-bottom: 0;
      font-size: 14px;
      font-weight: 400;
      font-style: italic;
      opacity: 0.7;
      @media only screen and (max-width: 800px) {
        text-align: center;
      }
    }
    &-releasedate {
      @media only screen and (max-width: 400px) {
        order: 1;
        flex-basis: 40%;
      }
      &::after {
        content: '\2022';
        margin: 0px 8px;
        font-size: 14px;
        line-height: 1;
        font-weight: bold;
      }
    }
    &-duration {
      @media only screen and (max-width: 400px) {
        order: 1;
        flex-basis: 40%;
      }
      &::before {
        content: '\2022';
        margin: 0px 8px;
        font-size: 14px;
        line-height: 1;
        font-weight: bold;
        @media only screen and (max-width: 500px) {
          ::before {
            content: '';
          }
        }
      }
    }
  }
  &__container {
    background: linear-gradient(to right, rgba($tmdbBlack, 0.75) 0%, rgba($tmdbDarkBlue, 0.75) 100%);
  }
  &__wrapper {
    padding: 30px 56px;
    display: flex;
    gap: 36px;
    margin: auto;
    @media only screen and (min-width: 1400px) {
      max-width: $max-width;
    }
    @media only screen and (max-width: 800px) {
      flex-direction: column;
      padding: 80px 56px 24px;
      gap: 8px;
    }
  }
  &__list {
    margin-top: 20px;
    justify-content: flex-start;
    flex-wrap: wrap;
    display: flex;
    position: relative;
    &-crew {
      flex-basis: 33%;
      text-align: left;
      margin-bottom: 14px;
      margin-right: 0;
      box-sizing: border-box;
      flex-direction: column;
      display: flex;
      padding-right: 20px;
      @media only screen and (max-width: 400px) {
        flex-basis: 50%;
      }
    }
    &-subtitle {
      font-size: 12px;
      font-weight: 400;
      span:first-child {
        &::before {
          content: " ";
        }
      }
      span:nth-of-type(n + 1):not(:first-child) {
        &::before {
          content: ", ";
        }
      }
    }
    &-title {
      font-size: 14px;
    }
  }
  &__poster {
    img {
      width: 300px;
      height: 450px;
      border-radius: $imageBorderRadius;
      @media only screen and (max-width: 768px) {
        width: 200px;
        height: auto;
      }
    }
  }
}

.cast {
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
  &__casts {
    display: flex;
    display: inline-flex;
    gap: 16px;
    @media only screen and (max-width: 800px) {
      gap: 8px;
    }
  }
  &__outerwrapper {
    display: flex;
  }
  .card {
    border: 1px solid rgba($darkerGrey, 1);
    padding-bottom: 10px;
    border-radius: $imageBorderRadius;
    overflow: hidden;
    width: 140px;
    box-shadow: $shadow;
    img {
      width: 100%;
      height: 180px;
      object-fit: cover;
    }
    .title {
      font-size: 14px;
    }
    .subtitle {
      font-size: 12px;
    }
    &__content {
      text-align: left;
      padding: 8px;
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
  .mobile-card {
    position: relative;
    width: 300px;
    height: 150px;
    border-radius: $imageBorderRadius;
    overflow: hidden;
    transition: 0.3s ease;
    cursor: pointer;
    @media only screen and (max-width: 800px) {
      width: 280px;
    }
    .backdrop {
      width: 100%;
      height: 100%;
      object-fit: cover;
      background-size: cover;
      border-radius: inherit;
      background-position: center;
      transition: 1s ease;
      transition-delay: 0.5s;
    }
    .title {
      position: absolute;
      color: $tmdbWhite;
      bottom: 0;
      left: 16px;
    }
  }
}

.recommendation {
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
  }
  &__wrapper {
    overflow-x: auto;
    overflow-y: hidden;
    @media only screen and (max-width: 800px) {
      height: 160px;
    }
  }
  &__movie {
    display: inline-flex;
    gap: 16px;
    @media only screen and (max-width: 800px) {
      gap: 8px;
    }
  }
  &__outerwrapper {
    display: flex;
  }
}

.social {
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
  }
  &__outerwrapper {
    display: flex;
  }
  &__card {
    display: inline-flex;
    gap: 16px;
    width: 100%;
    @media only screen and (max-width: 800px) {
      gap: 8px;
    }
  }
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
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
    cursor: pointer;
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

.playbtn {
  width: 40px;
  height: 40px;
  display: flex;
  align-self: center;
  position: absolute;
  bottom: 40%;
  z-index: 1;
  left: 40%;
}
</style>
