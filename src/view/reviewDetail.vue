<template>
  <div class="reviewDetail">
    <section class="inner_content nav">
      <div class="nav__container">
        <div class="nav__wrapper">
          <div class="nav__heading">
            <div class="nav__poster">
              <img :src="cardImage(details.poster_path)" />
            </div>
            <div>
              <h4>{{ details.title || details.name }}</h4>
              <div class="nav__content" @click="goToDetails(movieid, mediaType)">
                <img class="arrow" src="../assets/arrow.svg" />
                <h5>Back to main</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="inner_content review">
      <div class="review__container">
        <div class="review__wrapper">
          <ReviewCard
            :items="allReview"
            class="review__card"
          >
          </ReviewCard>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import axios from 'axios'
import ReviewCard from '@/components/ReviewCard/ReviewCard'

export default {
  name: 'reviewDetail',
  components: {
    ReviewCard
  },
  data () {
    return {
      movieid: '',
      mediaType: '',
      allReview: [],
      details: []
    }
  },
  methods: {
    goToDetails (id, media) {
      this.$router.push({name: 'movieDetail', params: { movieid: id, mediaType: media }})
    },
    cardImage (fileName) {
      if (fileName) {
        var d = fileName
        return 'https://image.tmdb.org/t/p/w500/' + d
      } else {
        return require(`../assets/male_cast.jpg`)
      }
    },
    getDetails (movieId, mediaType) {
      if (mediaType === 'movie') {
        axios.get('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=b1277a04710552a426ddcd619c0256bf').then(
          response => {
            this.details = response.data
          })
      } else {
        axios.get('https://api.themoviedb.org/3/tv/' + movieId + '?api_key=b1277a04710552a426ddcd619c0256bf').then(
          response => {
            this.details = response.data
          })
      }
    },
    getReview (movieId, mediaType) {
      if (mediaType === 'movie') {
        axios.get('https://api.themoviedb.org/3/movie/' + movieId + '/reviews?api_key=b1277a04710552a426ddcd619c0256bf').then(
          response => {
            if (response.data.results.length > 0) {
              this.allReview = response.data.results
            }
          }).catch(error => {
          console.log(error)
        })
      } else {
        axios.get('https://api.themoviedb.org/3/tv/' + movieId + '/reviews?api_key=b1277a04710552a426ddcd619c0256bf').then(
          response => {
            if (response.data.results.length > 0) {
              this.allReview = response.data.results
            }
          }).catch(error => {
          console.log(error)
        })
      }
    }
  },
  mounted () {
    this.movieid = this.$route.params.movieId
    this.mediaType = this.$route.params.mediaType
    this.getReview(this.movieid, this.mediaType)
    this.getDetails(this.movieid, this.mediaType)
  }
}
</script>
<style lang="scss" scoped>
@import '@/globalSCSS/globalvar.scss';
.reviewDetail {
  @media only screen and (max-width: 800px) {
    margin-top: 60px;
  }
}

.arrow {
  width: 16px;
  margin-right: 8px;
}

h4, h5 {
  margin: 0;
}

.inner_content {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  margin: auto;
}

.review {
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
    background: linear-gradient(to right, rgba($tmdbBlack, 0.75) 0%, rgba($tmdbDarkBlue, 0.75) 100%);
    height: 180px;
    margin-bottom: 24px;
    padding: 0px 24px;
  }
  &__outerwrapper {
    display: flex;
  }
  &__card {
    display: flex;
    flex-direction: column;
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

.nav {
  background: linear-gradient(to right, rgba($tmdbBlack, 0.75) 0%, rgba($tmdbDarkBlue, 0.75) 100%);
  height: 180px;
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
  &__heading {
    color: $tmdbWhite;
    display: flex;
  }
  &__poster {
    margin-right: 16px;
    img {
      width: 80px;
      height: auto;
      border-radius: $imageBorderRadius;
      @media only screen and (max-width: 768px) {
        width: 80px;
        height: auto;
      }
    }
  }
  &__content {
    display: flex;
    margin-top: 8px;
    color: $accountSilver;
    cursor: pointer;
    &:hover {
      color: $accountTeal;
    }
  }
}
</style>
