<template>
  <dl id="toggle-button">
    <dt :class="tabOn[0] ? 'each-button on border-radius-left' :'each-button border-radius-left'" @click="onClickTab(0)">
      <img v-if="tabOn[0]" src="@/assets/image/space/icons/path-red.png">전체
    </dt>
    <dt :class="tabOn[1] ? 'each-button on' :'each-button middle'" @click="onClickTab(1)">
      <img v-if="tabOn[1]" src="@/assets/image/space/icons/path-red.png">월세</dt>
    <dt :class="tabOn[2] ? 'each-button on border-radius-right' :'each-button border-radius-right'" @click="onClickTab(2)">
      <img v-if="tabOn[2]" src="@/assets/image/space/icons/path-red.png">전세
    </dt>
  </dl>
</template>

<script>
export default {
  data() {
    return {
      tabOn: [true, false, false]
    }
  },
  created() {
    this.$nextTick(() => {
      document.getElementsByClassName('each-button')[2].classList.remove('border-left-none')
    })
  },
  methods: {
    onClickTab(idx) {
      const tempArr = [false, false, false]
      tempArr.splice(idx, 1, true)
      this.tabOn = tempArr

      for (let index = 0; index < this.tabOn.length; index++) {
        document.getElementsByClassName('each-button')[index].classList.remove('border-left-none', 'border-right-none')
      }

      if (idx === 1) {
        document.getElementsByClassName('each-button')[0].classList.add('border-right-none')
        document.getElementsByClassName('each-button')[2].classList.add('border-left-none')
      }
    }
  }
}
</script>
