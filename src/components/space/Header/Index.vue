<template>
  <div id="header" :class="isBackDark ? 'dark' : ''">
    <section class="left-aria">
      <template v-if="!onClose">
        <img v-if="!isBackDark" src="@/assets/image/space/icons/path-left.png" @click="onCloseButton()">
        <img v-else src="@/assets/image/space/icons/path-left-white.png" @click="onCloseButton()">
      </template>
    </section>
    <section class="center-aria">
      <p :class="isBackDark ? 'white' : ''">{{ title }}</p>
    </section>
    <section class="right-aria">
      <template v-if="!isBackDark">
        <img v-if="onClose" class="btnX" src="@/assets/image/space/icons/x.png" @click="onCloseButton()">
        <img v-if="onMenu" class="btnMenu" src="@/assets/image/space/icons/menu-dots.png" @click="menuOpen = true">
      </template>

      <template v-else>
        <img v-if="onClose" class="btnX" src="@/assets/image/space/icons/x-white.png" @click="onCloseButton()">
        <img v-if="onMenu" class="btnMenu" src="@/assets/image/space/icons/menu-dots-white.png" @click="menuOpen = !menuOpen">
      </template>
      <p v-if="onRegister" class="btnRegister" :class="isBackDark ? 'white' : ''" @click="onClickAdd()">등록</p>
    </section>
    <dl v-show="menuOpen" class="menu-box">
      <dt @click="onClickEdit()"><p>수정</p></dt>
      <dt><p>중단</p></dt>
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
    onRegister: {
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
      if (value) {
        this.menuOpen = false
      }
    }
  },
  methods: {
    onCloseButton() {
      this.$router.go('-1')
    },
    onClickEdit() {
      this.$emit('click')
    },
    onClickAdd() {
      this.$emit('click')
    }
  }
}
</script>
