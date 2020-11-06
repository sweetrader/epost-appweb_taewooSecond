<template>
  <chooseMberSbscrb v-if="step_1" @mberSe="chooseMberSbscrb"/>
  <stplatAgre v-else-if="step_2" @historyback="historyBackGo" @stplatAgre="stplatAgreSbscrb"/>
  <sbscrbNice v-else-if="step_3" @nextStep="certiNiceSbscrb"/>
  <indvSbscrb v-else-if="step_IndvSbscrb_4" :index="insertMberSbscrb" @indvSbscrb="indvSbscrbData" @historyback="historyBackGo"/>
  <easyLogin v-else-if="step_5" :index="insertMberSbscrb" @easyLogin="easyLoginData" @easyLoginPass="easyLoginpassData" @historyback="historyBackGo"/>
  <sbscrbComplete v-else-if="step_6" :index="insertMberSbscrb"/>
</template>
<script>
import waves from '@/directive/waves'
import chooseMberSbscrb from '@/views/contents/mber/sbscrb/sbscrb'
import stplatAgre from '@/views/contents/mber/sbscrb/stplatAgre'
import sbscrbNice from '@/views/contents/mber/sbscrb/sbscrbNice'
import indvSbscrb from '@/views/contents/mber/sbscrb/indvSbscrb'

import easyLogin from '@/views/contents/mber/sbscrb/easyLogin'
import sbscrbComplete from '@/views/contents/mber/sbscrb/sbscrbComplete'

import { insertIndvSbscrb } from '@/api/mberSbscrb'
// import chooseMberSbscrb from '@/views/contents/mber/sbscrb/sbscrb'
export default {
  name: 'SbsCrbindex',
  directives: { waves },
  components: {
    chooseMberSbscrb,
    stplatAgre,
    sbscrbNice,
    indvSbscrb,
    easyLogin,
    sbscrbComplete
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
      insertMberSbscrb: {
        mberSeCd: '',
        subAgreCheakYn: '',
        mberNm: '',
        birth: '',
        gender: '',
        mbtlNo: '',
        mberPassword: '',
        mberRePassword: '',
        emailAddr: '',
        sbscrbDe: '',
        addr: '',
        addrDtl: '',
        zip: '',
        pinNoUseYn: 'N',
        bmtRcgnUseYn: 'N'
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
        case 5:
          if (this.insertMberSbscrb.mberSeCd === 'P') {
            this.step_IndvSbscrb_4 = true
            this.step_5 = false
          } else if (this.insertMberSbscrb.mberSeCd === 'B') {
            this.step_BizSbscrb_4 = true
            this.step_5 = false
          }
          break
      }
    },
    chooseMberSbscrb(mberSeCd) {
      this.insertMberSbscrb.mberSeCd = mberSeCd
      this.step_1 = false
      this.step_2 = true
    },
    stplatAgreSbscrb(subAgreCheakYn) {
      this.insertMberSbscrb.subAgreCheakYn = subAgreCheakYn
      this.step_2 = false
      this.step_3 = true
    },
    certiNiceSbscrb() {
      if (this.insertMberSbscrb.mberSeCd === 'P') {
        this.step_3 = false
        this.step_IndvSbscrb_4 = true
      } else {
        console.log('화면이나 달아라 뻘짓하지말고')
      }
    },
    indvSbscrbData(data) {
      this.insertMberSbscrb.mberNm = data.mberNm
      this.insertMberSbscrb.birth = data.birth
      this.insertMberSbscrb.gender = data.gender
      this.insertMberSbscrb.mbtlNo = data.mbtlNo
      this.insertMberSbscrb.mberPassword = data.mberPassword
      this.insertMberSbscrb.mberRePassword = data.mberRePassword
      this.insertMberSbscrb.emailAddr = data.emailAddr
      this.insertMberSbscrb.addr = data.addr
      this.insertMberSbscrb.addrDtl = data.addrDtl
      this.insertMberSbscrb.zip = data.zip

      this.step_IndvSbscrb_4 = false
      this.step_5 = true
    },
    easyLoginData() {
      this.step_5 = false
      this.step_6 = true
    },
    easyLoginpassData(data) {
      this.insertMberSbscrb.pinNoUseYn = data.pinNoUseYn
      this.insertMberSbscrb.bmtRcgnUseYn = data.bmtRcgnUseYn

      alert('회원가입을 진행 하겠습니까?')
      insertIndvSbscrb(this.insertMberSbscrb).then(response => {
        this.$message.success('회원가입이 성공했습니다.')
      }).catch(() => {
        alert('가입에 실패 했습니다.')
        this.$message.error('가입에 실패 했습니다.')
      })

      // this.step_5 = false
      // this.step_6 = true
    }

  }
}
</script>
