<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    // 반응형, 기기 폰트 사이즈에 영향받을 경우 실행 코드
    const num = 10
    const docEl = document.documentElement
    const width = docEl.getBoundingClientRect().width
    let rem = width / num
    rem = parseFloat(rem.toFixed(3))
    docEl.style.fontSize = rem + 'px'

    const realitySize = parseFloat(window.getComputedStyle(document.documentElement).fontSize)
    if (rem !== realitySize) {
      rem = rem * rem / realitySize
      docEl.style.fontSize = rem + 'px'
    }
  }
}
</script>
