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
        <div :class="isValid ? 'one-button-click' : isBackWhite? 'one-button-click white' : 'one-button-click invalid'" @click="onClickOneButton()">
          <img v-show="oneButton === '관심등록'" src="@/assets/image/icons/bookclip.png">
          {{ oneButton }}</div>
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
    },
    isBackWhite: {
      type: Boolean,
      default: false
    }

  },

  data() {
    return {
    }
  },
  methods: {
    onClickLeftButton() {
      this.$emit('action', 'LEFT')
    },
    onClickRightButton() {
      this.$emit('action', 'RIGHT')
    },
    onClickOneButton() {
      console.log('onClick')
      this.$emit('handleAdd')
      this.$emit('action', 'SINGLE')
    }
  }
}
</script>
