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
      }
    },
    created () {
      
    },
    mounted () {
      
    },
    destroyed () {
      
    }
  }