export default {
    name: 'Trailer',
    data () {
      return {
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
            var d = fileName
            return 'https://image.tmdb.org/t/p/w500/'+ d
        }
    },
    created () {
    },
    mounted () {
    },
    destroyed () { 
    }
  }