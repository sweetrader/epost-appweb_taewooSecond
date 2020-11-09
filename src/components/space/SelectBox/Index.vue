<template>
  <div id="select-box">
    <template v-if="open">
      <div class="dim"/>
      <section class="select-list-wraper">
        <div class="header">{{ header }}<img src="@/assets/image/space/icons/x.png" @click="open = false"></div>
        <dl>
          <dt v-for="( option, index ) in optionList" :key="option.index" :class="activeArray[index] ? 'each-option on' : 'each-option'" @click="onClickOptionBtn(index)">
            <p class="">{{ option }}</p>
          </dt>
        </dl>
      </section>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false
    },
    header: {
      type: String,
      default: ''
    },
    optionList: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      activeArray: []
    }
  },
  created() {
    this.optionList.forEach(i => {
      this.activeArray.push(false)
    })

    this.$nextTick(() => {
      const tempArr = this.activeArray
      tempArr.splice(0, 1, true)
      this.activeArray = tempArr
    })
  },
  methods: {
    onClickOptionBtn(index) {
      const tempArr = []
      for (let i = 0; i < this.optionList.length; i++) {
        tempArr.push(false)
      }
      tempArr.splice(index, 1, true)
      this.activeArray = tempArr

      window.scrollY = 0
      document.documentElement.scrollTop = 0
      this.$emit('select', this.optionList[index])
    }
  }
}
</script>
