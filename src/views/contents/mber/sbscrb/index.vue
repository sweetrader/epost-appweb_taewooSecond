<template>
  <chooseMberSbscrb v-if="step_1" @mberSe="chooseMberSbscrb"/>
  <stplatAgre v-else-if="step_2" @certiNice="certiNiceSbscrb"/>
</template>
<script>
import waves from '@/directive/waves'
import chooseMberSbscrb from '@/views/contents/mber/sbscrb/sbscrb'
import stplatAgre from '@/views/contents/mber/sbscrb/stplatAgre'
// import chooseMberSbscrb from '@/views/contents/mber/sbscrb/sbscrb'
export default {
  name: 'SbsCrbindex',
  directives: { waves },
  components: {
    chooseMberSbscrb,
    stplatAgre
  },
  data() {
    return {
      step_1: true,
      step_2: false,
      step_3: false,
      step_4: false,
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
    chooseMberSbscrb(mberSeCd) {
      this.insertMberSbscrb.mberSeCd = mberSeCd
      this.step_1 = false
      this.step_2 = true
      console.log(this.insertMberSbscrb.mberSeCd)
    },
    certiNiceSbscrb(subAgreCheakYn) {
      this.insertMberSbscrb.subAgreCheakYn = subAgreCheakYn
      console.log(this.insertMberSbscrb.subAgreCheakYn)
    }
  }
}
</script>
