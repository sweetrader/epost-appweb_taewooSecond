<template>
  <div id="tab">
    <section>
      <p :class="leftOn ? 'active' : ''">
        공간공유
      </p>
    </section>
    <section>
      <p :class="!leftOn ? 'active' : ''">
        회의실예약
      </p>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    leftOn: {
      type: Boolean,
      default: true
    }
  }
}
</script>
