import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home'
import movieDetail from '@/view/movieDetail'
import reviewDetail from '@/view/reviewDetail'
import movie from '@/view/movie'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/movieDetail/:mediaType/:movieid',
      name: 'movieDetail',
      component: movieDetail
    },
    {
      path: '/reviewDetail/:mediaType/:movieId',
      name: 'reviewDetail',
      component: reviewDetail
    },
    {
      path: '/movie/:query',
      name: 'movie',
      component: movie
    }
  ],
  mode: 'history'
})
