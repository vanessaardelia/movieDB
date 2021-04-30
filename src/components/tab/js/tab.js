export default {
  name: 'Tab',
  data () {
    return {
      selectedIndex: 0,
      left:'',
      width:''
    }
  },
  props: {
    title: { required: true },
    tabs: Array,
    tabIndex: {
      type: String,
      default: '0'
    },
    selectedTabIndex: 0
  },
  watch: {
    selectedTabIndex (v) {
      this.selectedIndex = v
    }
  },
  computed: {
    selectedTab() {
      return this.$refs.tabItems[this.selectedIndex]
    },
    sliderStyle() {
      return {
        left: this.left + 'px',
        width: this.width + 'px'
      }
    }
  },
  methods: {
    tabClasses (idx) {
      return {
        'active': (idx == this.selectedIndex)
      }
    },
    selectTab(idx) {
      this.selectedIndex = idx
      this.updateSliderSize()
      this.$emit('tabClick', this.selectedIndex)
    },
    updateSliderSize() {
      this.$nextTick(() => {
        this.width = this.selectedTab.offsetWidth
        this.left = this.selectedTab.offsetLeft
      })
    }
  },
  created () {
  },
  mounted () {
    this.selectedIndex = parseInt(this.tabIndex) || this.selectedTabIndex
  },
  destroyed () {
  }
}