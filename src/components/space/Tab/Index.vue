<template>
  <div id="tab">
    <section @click="onChangeFocusing(true)">
      <p :class="leftOn ? 'active' : ''">
        공간공유
      </p>
    </section>
    <section @click="onChangeFocusing(false)">
      <p :class="!leftOn ? 'active' : ''">
        회의실예약
      </p>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leftOn: true
    }
  },
  methods: {
    onChangeFocusing(value) {
      this.leftOn = value
    }
  }
}
</script>
