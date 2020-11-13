<template>
  <div id="header" :class="isBackDark ? 'dark' : ''">
    <section class="left-aria">
      <template v-if="!onClose">
        <img v-if="!isBackDark" src="@/assets/image/icons/path-left.png" @click="onCloseButton()">
        <img v-else src="@/assets/image/icons/path-left-white.png" @click="onCloseButton()">
      </template>
    </section>
    <section class="center-aria">
      <p :class="isBackDark ? 'white' : ''">{{ title }}</p>
    </section>
    <section class="right-aria">
      <template v-if="!isBackDark">
        <img v-if="onClose" class="btnX" src="@/assets/image/icons/x.png" @click="onCloseButton()">
        <img v-if="onMenu" class="btnMenu" src="@/assets/image/icons/menu-dots.png" @click="menuOpen = true">
      </template>

      <template v-else>
        <img v-if="onClose" class="btnX" src="@/assets/image/icons/x-white.png" @click="onCloseButton()">
        <img v-if="onMenu" class="btnMenu" src="@/assets/image/icons/menu-dots-white.png" @click="menuOpen = !menuOpen">
      </template>
      <p v-if="onResister" class="btnRegister" :class="isBackDark ? 'white' : ''">등록</p>
    </section>
    <dl v-show="menuOpen" class="menu-box">
      <dt><p>게시글 수정</p></dt>
      <dt><p>공고마감</p></dt>
      <dt><p>알림 전송</p></dt>
      <dt><p>계약관리</p></dt>
      <dt><p>예치금송금결과</p></dt>
    </dl>
  </div>
</template>

<script>
export default {
  props: {
    isBackDark: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    onClose: {
      type: Boolean,
      default: false
    },
    onMenu: {
      type: Boolean,
      default: false
    },
    onResister: {
      type: Boolean,
      default: false
    },
    menuClose: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      menuOpen: false
    }
  },
  watch: {
    menuClose(value) {
      console.log(value)
      if (value) {
        this.menuOpen = false
      }
    }
  },
  created() {

  },
  methods: {
    onCloseButton() {
      this.$router.go('-1')
    }
  }
}
</script>
