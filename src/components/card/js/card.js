import VuePercentageCircle from 'vue-css-percentage-circle'

export default {
    name: 'Card',
    components: {
      VuePercentageCircle
    },
    data () {
      return {
        percentColor: 'green'
      }
    },
    props: {
      title: String,
      items: Array
    },
    watch: {
    },
    computed: {
    },
    methods: {
      cardClick(idx) {
        this.$emit('cardClick', idx)
      },
      cardImage (fileName) {
        if (fileName) {
          var d = fileName
          return 'https://image.tmdb.org/t/p/w500/'+ d
        } else {
          return require(`@/assets/male_cast.jpg`)
        }
      }
    },
    created () {
    },
    mounted () {
    },
    destroyed () { 
    }
  }