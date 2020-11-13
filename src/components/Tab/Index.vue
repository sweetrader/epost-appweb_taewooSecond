<template>
  <div id="tab">
    <section @click="onChangeFocusing(0)">
      <p :class="tabOn[0] ? 'active' : ''">
        택배수집
      </p>
    </section>
    <section @click="onChangeFocusing(1)">
      <p :class="tabOn[1] ? 'active' : ''">
        소포분류
      </p>
    </section>
    <section @click="onChangeFocusing(2)">
      <p :class="tabOn[2] ? 'active' : ''">
        택배배송
      </p>
    </section>
    <section @click="onChangeFocusing(3)">
      <p :class="tabOn[3] ? 'active' : ''">
        운송차량
      </p>
    </section>
  </div>
</template>

<script>

export default {
  props: {
    // 유형(등록: register, 리스트: list 상세: dtl)
    confirmType: {
      type: String,
      default: 'register'
    }
  },
  data() {
    return {
      tabOn: [true, false, false, false]
    }
  },
  created() {
    this.editCheck()
  },
  methods: {
    onChangeFocusing(index) {
      const tempValue = [false, false, false, false]
      tempValue.splice(index, 1, true)
      this.tabOn = tempValue

      switch (this.confirmType) {
        case 'list':
          this.$emit('toList', index + 1)
          break
        case 'register':
          this.$emit('toRegister', index + 1)
          break
        case 'dtl':
          break
      }
    },
    async editCheck() {
    }
  }
}
</script>
