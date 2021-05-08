// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueYoutube from 'vue-youtube'
import VueYouTubeEmbed from 'vue-youtube-embed'
import ReadMore from 'vue-read-more'
import Paginate from 'vuejs-paginate'
Vue.use(Paginate)
Vue.use(ReadMore)
Vue.use(VueYouTubeEmbed)
Vue.use(VueYoutube)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
