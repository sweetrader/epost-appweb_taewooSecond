<template>
  <chooseMberSbscrb v-if="step_1" @mberSe="chooseMberSbscrb"/>
  <stplatAgre v-else-if="step_2" @historyback="historyBackGo" @stplatAgre="stplatAgreSbscrb"/>
  <sbscrbNice v-else-if="step_3" @nextStep="certiNiceSbscrb"/>
  <indvSbscrb v-else-if="step_IndvSbscrb_4" @historyback="historyBackGo"/>
</template>
<script>
import waves from '@/directive/waves'
import chooseMberSbscrb from '@/views/contents/mber/sbscrb/sbscrb'
import stplatAgre from '@/views/contents/mber/sbscrb/stplatAgre'
import sbscrbNice from '@/views/contents/mber/sbscrb/sbscrbNice'
import indvSbscrb from '@/views/contents/mber/sbscrb/indvSbscrb'
// import chooseMberSbscrb from '@/views/contents/mber/sbscrb/sbscrb'
export default {
  name: 'SbsCrbindex',
  directives: { waves },
  components: {
    chooseMberSbscrb,
    stplatAgre,
    sbscrbNice,
    indvSbscrb
  },
  data() {
    return {
      step_1: true,
      step_2: false,
      step_3: false,
      step_IndvSbscrb_4: false,
      step_BizSbscrb_4: false,
      step_5: false,
      step_6: false,
      step_7: false,
      insertMberSbscrb: {
        mberSeCd: '',
        subAgreCheakYn: ''
      }
    }
  },
  created() {

  },
  methods: {
    historyBackGo(num) {
      switch (num) {
        case 2:
          this.step_1 = true
          this.step_2 = false
          break
        case 4:
          this.step_2 = true
          this.step_IndvSbscrb_4 = false
          this.step_BizSbscrb_4 = false
          break
      }
    },
    chooseMberSbscrb(mberSeCd) {
      this.insertMberSbscrb.mberSeCd = mberSeCd
      this.step_1 = false
      this.step_2 = true
      console.log(this.insertMberSbscrb.mberSeCd)
    },
    stplatAgreSbscrb(subAgreCheakYn) {
      this.insertMberSbscrb.subAgreCheakYn = subAgreCheakYn
      this.step_2 = false
      this.step_3 = true
      console.log(this.insertMberSbscrb.subAgreCheakYn)
    },
    certiNiceSbscrb() {
      if (this.insertMberSbscrb.mberSeCd === 'P') {
        this.step_3 = false
        this.step_IndvSbscrb_4 = true
      } else {
        console.log('화면이나 달아라 뻘짓하지말고')
      }
    }
  }
}
</script>
