export default {
    name: 'Searchbar',
    data () {
      return {
      }
    },
    props: {
      placeholder: {
        type: String,
        default: 'Search..'
      },
      value: {
        type: String
      }
    },
    watch: {
    },
    computed: {
      inputClasses() {
        return {
          'has-placeholder': this.placeholder,
          'has-value': this.value
        }
      }
    },
    methods: {
      btnClick () {
        this.$emit('btnClick')
      },
      updateValue: function (value) {
        this.$emit('input', value)
      }
    },
    created () {
    },
    mounted () {
      
    },
    destroyed () {
      
    }
  }