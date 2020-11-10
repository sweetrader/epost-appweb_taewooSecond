<template>
  <transition name="slides">
    <div v-show="open" id="select-box">
      <div class="dim"/>
      <section class="select-list-wraper">
        <div class="header">{{ header }}<img src="@/assets/image/space/icons/x.png" @click="$emit('select', '')"></div>
        <dl>
          <dt v-for="( option, index ) in optionList" :key="option.codeDtl" :value="option.codeDtl" :class="activeArray[index] ? 'each-option on' : 'each-option'" @click="onClickOptionBtn(index)">
            <p class="">{{ option.dtlNm }}</p>
          </dt>
        </dl>
      </section>
    </div>
  </transition>
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
