<template>
  <div id="bottom-button">
    <template v-if="type === 1">
      <div class="two-button">
        <div class="left-button" @click="onClickLeftButton()">{{ leftButton }}</div>
        <div class="right-button" @click="onClickRightButton()">{{ rightButton }}</div>
      </div>
    </template>

    <template v-if="type === 2">
      <div class="two-button_v2">
        <div class="left-button" @click="onClickLeftButton()">{{ leftButton }}</div>
        <div class="right-button" @click="onClickRightButton()">{{ rightButton }}</div>
      </div>
    </template>

    <template v-else>
      <div class="one-button">
        <div :class="isValid ? 'one-button-click' : 'one-button-click invalid'" @click="onClickOneButton()">{{ oneButton }}</div>
      </div>
    </template>
  </div>
</template>

<script>

export default {
  name: 'BottomButton',
  props: {
    type: {
      type: Number,
      default: 3
    },
    leftButton: {
      type: String,
      default: ''
    },
    rightButton: {
      type: String,
      default: ''
    },
    oneButton: {
      type: String,
      default: ''
    },
    isValid: {
      type: Boolean,
      default: false
    }

  },

  data() {
    return {
    }
  },
  methods: {

  }
}
</script>
