<template>
  <div id="header" :class="isBackDark ? 'dark' : ''">
    <section class="left-aria">
      <template v-if="!onClose">
        <img v-if="!isBackDark" src="@/assets/image/space/icons/path-left.png">
        <img v-else src="@/assets/image/space/icons/path-left-white.png">
      </template>
    </section>
    <section class="center-aria">
      <p :class="isBackDark ? 'white' : ''">{{ title }}</p>
    </section>
    <section class="right-aria">
      <template v-if="!isBackDark">
        <img v-if="onClose" class="btnX" src="@/assets/image/space/icons/x.png">
        <img v-if="onMenu" class="btnMenu" src="@/assets/image/space/icons/menu-dots.png">
      </template>

      <template v-else>
        <img v-if="onClose" class="btnX" src="@/assets/image/space/icons/x-white.png">
        <img v-if="onMenu" class="btnMenu" src="@/assets/image/space/icons/menu-dots-white.png">
      </template>
      <p v-if="onResister" class="btnRegister" :class="isBackDark ? 'white' : ''">등록</p>
    </section>
    <div class="menu-box"/>
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
    }
  },
  data() {
    return {

    }
  }
}
</script>
