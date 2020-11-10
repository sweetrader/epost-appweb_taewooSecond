<template>
  <div class="app-container" style="background-color: #e4e4e4;" @touchstart="clearMoreButton">
    <header>
      <a href="#" class="back" @click="$router.back()"/><h1>질문 상세</h1>
    </header>
    <div class="jisik_list mtop59">
      <div class="question_title">
        <b>{{ kmsBoard.kmsSj }}</b>
        <span>{{ getCnByPublicYn(kmsBoard.registerNm, kmsBoard.publicYn, false) }}</span><span>{{ getDateStr(kmsBoard.registerDt) }}</span>
        <template v-if="isWriter(kmsBoard.registerId)">
          <div class="more" @touchstart.stop="clickMoreButton"/>
          <div v-show="showKmsBoardMoreButton" class="question_more_action">
            <a href="#" @touchstart="edit(kmsBoard.kmsId, null,false)">수정</a>
            <a href="#">삭제</a>
          </div>
        </template>
      </div>
      <div class="question_content answer_html" v-html="kmsBoard.kmsCn"/>
      <a href="#" class="question_answer_btn" @click="answerReply()">
        <div class="question_answer_btn_i"/>답변등록
      </a>
    </div>
    <div v-for="(kmsBoardReply, rplIndex) in kmsBoardReplyList" :key="kmsBoardReply.rplId">
      <div class="answer_cell">
        <div class="whos_answer">
          <div :class="isSelected(kmsBoardReply.rplId) ? 'picked_answer' : 'answer'">{{ isSelected(kmsBoardReply.rplId) ? '채택' : '답변' }}</div>
          <span>{{ kmsBoardReply.registerNm }}님의 답변</span><b>{{ getDateStr(kmsBoardReply.registerDt) }}</b>
          <template v-if="isWriter(kmsBoardReply.registerId)">
            <div class="more"/>
            <div v-show="true" class="question_more_action">
              <a href="#">수정</a>
              <a href="#">삭제</a>
            </div>
          </template>
        </div>
      </div>
      <div class="answer_content">
        <div class="answer_html" v-html="getCnByPublicYn(kmsBoardReply.rplCn, kmsBoardReply.publicYn, true)"/>
        <div class="answer_content_bottom">
          <!-- <div :class="{ 'disable_recommend' : isWriter(kmsBoardReply.registerId) }">추천 <span>{{ kmsBoardReply.recTotCnt }}</span></div> -->
          <div @click="registerKmsBoardReplyRecommend(kmsBoardReply.rplId, kmsBoardReply.registerId)">추천 <span>{{ kmsBoardReply.recTotCnt }}</span></div>
          <div @click="showCommentInput(kmsBoard.kmsId, kmsBoardReply.rplId, rplIndex)">댓글 <span>{{ kmsBoardReply.reltReplyList.length }}</span></div>
          <div v-if="showSelectButton(kmsBoardReply.registerId)" @click="updateKmsBoardReplySelected(kmsBoardReply.rplId, kmsBoardReply.registerId)">채택하기</div>
        </div>
      </div>
      <div class="dat_bg">
        <div v-for="kmsBoardReltReply in kmsBoardReply.reltReplyList" :key="kmsBoardReltReply.rplId" class="dat_cell">
          <template v-if="kmsBoardReltReply.rplId">
            <b>{{ kmsBoardReltReply.registerNm }}님</b><span>{{ getDateStr(kmsBoardReltReply.registerDt) }}</span><br>
            <div v-html="getCnByPublicYn(kmsBoardReltReply.rplCn, kmsBoardReltReply.publicYn, true)"/>
          </template>
          <template v-else>
            <quill-editor
              :content="newReltReplyInfo.rplCn"
              :options="editorOption"
              @change="onEditorChange($event)"/>
            <button @click="registerComment">등록</button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isEmpty, KMS_CONTENTS_MAX } from '@/utils/kms'
import { getKmsBoard, registerKmsBoardReplyRecommend, registerKmsBoardReply, updateKmsBoardReplySelected } from '@/api/kms'
import { getDateStr } from '@/utils/kms'
import { html2Text } from '@/utils'

export default {
  name: 'KmsDetail',
  props: {
    id: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      allowReply: true,
      kmsBoard: {
        kmsId: null,
        kmsSj: null,
        kmsCn: null,
        publicYn: null,
        registerId: null,
        registerNm: null
      },
      newReltReplyInfo: {
        kmsId: this.id,
        rplId: null,
        rplCn: null,
        reltRplId: null,
        registerId: this.$store.getters.mberId,
        registerNm: this.$store.getters.name,
        rplIndex: null,
        reltRplIndex: null
      },
      editorOption: {
        theme: 'snow',
        placeholder: '댓글 입력',
        modules: {
          toolbar: false
        }
      },
      kmsBoardReplyList: null,
      replyTotCnt: 0,
      selKmsBoardReply: null,
      kmsBoardParams: {
        kmsId: this.id,
        rPage: 1,
        rSize: 100
      },
      moreButtonList: [],
      findIndex: -1,
      showKmsBoardMoreButton: false,
      dataLoading: false,
      confirmLoading: false
    }
  },
  created() {
    this.dataLoading = true
    this.getKmsBoard()
    setTimeout(() => {
      this.dataLoading = false
    }, 300)
  },
  methods: {
    async getKmsBoard() {
      const response = await getKmsBoard(this.kmsBoardParams)
      this.allowReply = response.resData.allowReply
      this.replyTotCnt = response.resData.replyTotCnt
      this.kmsBoard = response.resData.kmsBoard
      this.kmsBoardReplyList = response.resData.kmsBoardReplyList
      this.selKmsBoardReply = response.resData.selKmsBoardReply
      console.log(response)
    },
    html2Text(val) {
      return html2Text(val)
    },
    getCnByPublicYn(cn, publicYn, isReply) {
      if (publicYn === 'Y') {
        return cn
      } else {
        return isReply ? '관리자에 의해 비공개 처리된 답변입니다.' : '관리자에 의해 비공개 처리된 글입니다.'
      }
    },
    changeTabIndex() {
      this.tabIndex = (this.tabIndex === 1) ? 2 : 1
    },
    getDateStr(value) {
      return getDateStr(value)
    },
    isSelected(rplId) {
      if (isEmpty(this.selKmsBoardReply)) {
        return false
      } else if (this.selKmsBoardReply.rplId === rplId) {
        return true
      } else {
        return false
      }
    },
    showSelectButton(registerId) {
      return (this.selKmsBoardReply === null && this.isWriter(this.kmsBoard.registerId) && this.isWriter(registerId) === false)
    },
    isWriter(registerId) {
      return (!isEmpty(registerId) && registerId === this.$store.getters.mberId)
    },
    async registerKmsBoardReplyRecommend(rplId, registerId) {
      if (this.isWriter(registerId)) {
        this.showAlert('본인이 작성한 답변은 추천 할 수 없습니다.', false, null, null)
      } else {
        const kmsBoardReplyParams = {
          rplId: rplId,
          registerId: this.$store.getters.mberId
        }
        const response = await registerKmsBoardReplyRecommend(kmsBoardReplyParams)
        if (response.resCode === 1000) {
          this.showAlert('추천 했습니다.', false, null, null)
        } else if (response.resCode === 1004) {
          this.showAlert('이미 추천 했습니다.', false, null, null)
        }
        console.log(response)
      }
    },
    closeComment(kmsCommentInputParam) {
      console.log(this.newReltReplyInfo.rplIndex)
      console.log(this.newReltReplyInfo.reltRplIndex)
      this.kmsBoardReplyList[this.newReltReplyInfo.rplIndex].reltReplyList.splice(this.newReltReplyInfo.reltRplIndex, 1)
      this.resetOpenReltReplyInfo()
    },
    resetOpenReltReplyInfo() {
      // this.newReltReplyInfo.kmsId = null
      this.newReltReplyInfo.rplId = null
      this.newReltReplyInfo.rplCn = null
      this.newReltReplyInfo.reltRplId = null
      // this.newReltReplyInfo.registerId = null
      this.newReltReplyInfo.rplIndex = null
      this.newReltReplyInfo.reltRplIndex = null
    },
    showCommentInput(kmsId, rplId, rplIndex) {
      this.closeOpenedKmsCommentInput()
      const tempReltReply = {
        rplId: null,
        rplCn: null,
        registerId: this.$store.getters.mberId,
        kmsId: kmsId,
        reltRplId: rplId
      }
      this.newReltReplyInfo.kmsId = kmsId
      this.newReltReplyInfo.reltRplId = rplId
      this.newReltReplyInfo.rplIndex = rplIndex
      this.newReltReplyInfo.reltRplIndex = this.kmsBoardReplyList[rplIndex].reltReplyList.length
      this.kmsBoardReplyList[rplIndex].reltReplyList.push(tempReltReply)
    },
    closeOpenedKmsCommentInput() {
      if (this.newReltReplyInfo.rplIndex !== null && this.newReltReplyInfo.reltRplIndex !== null) {
        this.kmsBoardReplyList[this.newReltReplyInfo.rplIndex].reltReplyList.splice(this.newReltReplyInfo.reltRplIndex, 1)
        this.resetOpenReltReplyInfo()
      }
    },
    onEditorChange({ quill, html, text }) {
      if (html.length > KMS_CONTENTS_MAX) {
        quill.history.undo()
      }
      this.newReltReplyInfo.rplCn = quill.root.innerHTML

      // this.$emit('input', this.rplCn)
    },
    async registerComment(kmsCommentInputParam) {
      // console.log(kmsCommentInputParam.rplId)
      // console.log(kmsCommentInputParam.rplIndex)
      // console.log(kmsCommentInputParam.reltRplIndex)
      // console.log(kmsCommentInputParam.comment)
      const reltReplyParams = {
        kmsId: this.newReltReplyInfo.kmsId,
        rplCn: this.newReltReplyInfo.rplCn,
        reltRplId: this.newReltReplyInfo.reltRplId,
        registerId: this.$store.getters.mberId
      }
      const response = await registerKmsBoardReply(reltReplyParams)
      console.log(response)
      const tempRplIndex = this.newReltReplyInfo.rplIndex
      this.closeOpenedKmsCommentInput()
      this.kmsBoardReplyList[tempRplIndex].reltReplyList.push(response.resData)

      // const tempReltReply = {
      //   rplId: 1001,
      //   rplCn: this.newReltReplyInfo.rplCn,
      //   registerId: this.$store.getters.mberId,
      //   kmsId: this.newReltReplyInfo.kmsId,
      //   reltRplId: this.newReltReplyInfo.rplId
      // }
      // const tempRplIndex = this.newReltReplyInfo.rplIndex
      // this.closeOpenedKmsCommentInput()
      // this.kmsBoardReplyList[tempRplIndex].reltReplyList.push(tempReltReply)

      // const response = this.registerKmsBoardReltReply(reltReplyParams)
      // console.log(response)
    },
    answerReply() {
      if (this.allowReply === false) {
        this.showAlert('답변은 한번만 가능합니다.<br> 추가 의견은 댓글을 작성해주세요.', false, null, null)
        return
      }
      this.$router.push({ name: 'CreateKmsEditor', params: { isReply: true, kmsId: this.kmsBoard.kmsId }})
    },
    async updateKmsBoardReplySelected(rplId, registerId) {
      if (this.isWriter(registerId)) {
        this.showAlert('본인의 답변은 채택할 수 없습니다.', false, null, null)
        return
      }

      this.showAlert('답변을 채택 하시겠습까? <br> 채택 후 취소할 수 없습니다.', true, null, async() => {
        const kmsBoardReplyParams = {
          rplId: rplId,
          registerId: this.$store.getters.mberId
        }
        this.confirmLoading = true
        const response = await updateKmsBoardReplySelected(kmsBoardReplyParams)
        console.log(response)
        this.confirmLoading = false
        if (response.resCode === 1000) {
          // this.getKmsBoard()
          this.selKmsBoardReply = response.resData
          this.showAlert('답변을 채택 했습니다.', false, null, null)
        }
      })
      // this.showAlert('채택 하시겠습까? <br> 채택 후 취소할 수 없습니다.', true, null, () => {
      //   console.log('showAlert')
      //   const kmsBoardReplyParams = {
      //     rplId: rplId,
      //     registerId: this.$store.getters.mberId
      //   }
      //   this.confirmLoading = true
      //   updateKmsBoardReplySelected(kmsBoardReplyParams).then(response => {
      //     console.log(response)
      //     if (response.resCode === 1000) {
      //       this.showAlert('답변을 채택 했습니다.', false)
      //     }
      //   }).catch(() => {
      //   }).finally(() => {
      //     this.confirmLoading = false
      //   })
      // })
    },
    showAlert(value, isTwoBtn, leftsuccess, rightsuccess) {
      const alertOption = {
        show: true,
        content: value,
        leftBtn: isTwoBtn ? '취소' : null,
        rightBtn: isTwoBtn ? '확인' : null,
        leftsuccess: isTwoBtn ? leftsuccess : null,
        rightsuccess: isTwoBtn ? rightsuccess : null
      }
      this.Alert(alertOption)
    },
    clickMoreButton(id, isReply) {
      console.log('clickMoreButton', this.showKmsBoardMoreButton)
      this.showKmsBoardMoreButton = !this.showKmsBoardMoreButton
      // if (this.showKmsBoardMoreButton === false) {
      //   this.showKmsBoardMoreButton = true
      // }
      // this.findIndex = this.moreButtonList.findIndex(item => item.isReply === isReply && item.id === id)
      // console.log(this.findIndex)
      // if (this.findIndex === -1) {
      //   const moreButtonInfo = {
      //     isReply: isReply,
      //     id: id,
      //     show: true
      //   }
      //   this.moreButtonList.push(moreButtonInfo)
      // } else {
      //   this.moreButtonList[this.findIndex].show = !this.moreButtonList[this.findIndex].show
      // }
      // const matched = this.moreButtonList.filter(item => item.isReply === isReply && item.id === id)
      // if (matched.length === 0) {
      //   const moreButtonInfo = {
      //     isReply: isReply,
      //     id: id,
      //     show: true
      //   }
      //   this.moreButtonList.push(moreButtonInfo)
      // } else {
      //   const moreButtonInfo = {
      //     isReply: matched[0].isReply,
      //     id: matched[0].id,
      //     show: !matched[0].show
      //   }
      //   matched.splice(0, 1)
      //   this.moreButtonList.push(moreButtonInfo)
      // }
      // console.log(this.moreButtonList)
    },
    showMoreButton(id, isReply) {
      const matched = this.moreButtonList.filter(item => item.isReply === isReply && item.id === id)
      return matched.length !== 0 && matched[0]
    },
    edit(id, rplId, isReply) {
      console.log('edit this.replyTotCnt = ' + this.replyTotCnt)
      if (this.replyTotCnt !== 0) {
        this.showAlert('답변이 있는 글은 수정할 수 없습니다.', false, null, null)
        return
      }
      if (isReply) {
        this.$router.push({ name: 'EditKmsEditor', params: { isReply: true, kmsId: id, id: rplId }})
      } else {
        this.$router.push({ name: 'EditKmsEditor', params: { isReply: false, kmsId: id }})
      }
    },
    clearMoreButton() {
      this.showKmsBoardMoreButton = false
      console.log('clearMoreButton', this.showKmsBoardMoreButton)
      // if (this.showKmsBoardMoreButton) {
      //   setTimeout(() => {
      //     this.showKmsBoardMoreButton = false
      //   }, 200)
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
/*.dat_cell:last-child { box-sizing:border-box;width:100%;height:auto;padding-top:20px;padding-bottom:18px;padding-left:32px;padding-right:52px;position:relative;border-bottom:0px;font-size:12px;color:#495057;font-weight:normal;line-height:17px; } */
.answer_html { word-break: break-all;  white-space: pre-wrap; }
.answer_content_bottom div:nth-of-type(1) { cursor:pointer;display:inline-block;vertical-align:middle;padding-left:30px;padding-right:7px;border:1px solid #adb5bd;border-radius:3px;box-sizing:border-box;height:34px;line-height:32px;background:url('~@/assets/image/good.png') no-repeat;background-size:28px 33px;background-position:left top;margin-right:8px;font-size:12px;font-weight:normal;color:#495057; }
.disable_recommend { cursor:none !important; }
.quill-editor {
  /*margin-top: 20px;*/
  margin-left: -16px;
  font-size: 12px;
  font-weight: normal;
  color: black;
  font-family: 'Noto Sans KR', sans-serif !important;
  resize: none;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: calc( 100% - 5px);
  height: 70px;
  border: 1px solid #adb5bd;
  border-radius: 4px 0px 0px 4px;
  border-right: none;
  background: white;
  padding: 10px;
  float: left;
}
.quill-editor >>> .ql-container {
  font-family: 'Noto Sans KR', sans-serif !important;
  font-weight: normal;
  color: black;
  font-size: 14px;
  border: 1px solid #adb5bd;
  border-radius: 3px;
  box-sizing:border-box;
}
.quill-editor >>> .ql-blank::before {
  font-family: 'Noto Sans KR', sans-serif !important;
  font-style: normal;
  color:#ADB5BD;
  font-weight: normal;
  font-size: 12px;
  left: 0px;
  right: 0px;
}
.quill-editor >>> .ql-editor {
  font-family: 'Noto Sans KR', sans-serif !important;
  font-weight: normal;
  color: black;
  font-size: 12px;
  resize:none;
  outline:none;
  padding: 0px;
  /*padding: 10px;*/
}

.quill-editor >>> .ql-snow {
  border: none;
}

.dat_cell button {
  margin-right: -36px;
  margin-top: 0px;
  width: 57px;
  float: left;
  border: 1px solid #adb5bd;
  border-radius: 0px 4px 4px 0px;
  background: white;
  text-align: center;
  color: #495057;
  font-size: 12px;
  font-weight: normal;
  height: 70px;
}

.question_more_action {
  z-index: 10;
}
</style>
