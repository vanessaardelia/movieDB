export default {
    name: 'Navbar',
    data () {
      return {
        
      }
    },
    watch: {
      
    },
    computed: {
      
    },
    methods: {
      goToHome () {
        const path = `/`
        if (path !== this.$router.currentRoute.path) {
          this.$router.push({name: 'Home'})
        }
      },
      goToMovie (data) {
        this.$router.push({name: 'movie', params: { query: data }})
        window.location.reload(true)
        window.scrollTo(0, 0)
      }
    },
    created () {
      
    },
    mounted () {
      
    },
    destroyed () {
      
    }
  }