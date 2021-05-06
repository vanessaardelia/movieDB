export default {
    name: 'Trailer',
    data () {
      return {
        backdrop: ''
      }
    },
    props: {
      title: String,
      items: Array,
      playbtn: Boolean
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
      },
      mouseOver (backdrop) {
        this.backdrop = backdrop
        this.$emit('hover', backdrop)
      }
    },
    created () {
    },
    mounted () {
    },
    destroyed () { 
    }
  }