import moment from 'moment'

export default {
    name: 'ReviewCard',
    data () {
      return {
        
      }
    },
    props: {
      items: Array
    },
    watch: {
    },
    computed: {
    },
    methods: {
      format (date) {
        this.date = moment(String(date)).format('LLL')
      },
      cardImage (author) {
        if (author.avatar_path) {
          if (author.avatar_path.startsWith("/https:")) {
            var d = author.avatar_path.substring(1, author.avatar_path.length);
            return d
          } else {
            var d = author.avatar_path
            return 'https://image.tmdb.org/t/p/w500/'+ d
          }
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