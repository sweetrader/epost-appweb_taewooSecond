<template>
  <div class="app-container">
    <header>
      <a href="#" class="back" @click="$router.back()"/>
      <h1>{{ isReply ? '답변 등록' : '질문 등록' }}</h1>
    </header>
    <template v-if="isReply">
      <div class="answer_window">
        <div class="question_title2">
          <b>{{ kmsBoard.kmsSj }}</b>
          <span>{{ kmsBoard.registerNm }}</span><span>{{ getDateStr(kmsBoard.registerDt) }}</span>
        </div>
        <div class="padding15">
          <quill-editor
            :content="contents"
            :options="editorOption"
            @change="onEditorChange($event)"/>
        </div>
        <a href="#" class="next_btn2" @click="completeEditor">등록</a>
      </div>
    </template>
    <template v-else>
      <div class="bw">
        <input v-model="title" maxlength="250" type="text" placeholder="제목 입력">
        <quill-editor
          :content="contents"
          :options="editorOption"
          @change="onEditorChange($event)"/>
      </div>
      <a href="#" class="next_btn2" @click="completeEditor">등록</a>
    </template>

  </div>
</template>

<script>
const categoryOptions = [
  { key: CATEGORY_TYPE.DLVY, name: '택배 배송', show: false },
  { key: CATEGORY_TYPE.PRC_CL, name: '소포 분류', show: false },
  { key: CATEGORY_TYPE.DLVY_PIC, name: '택배 픽업', show: false },
  { key: CATEGORY_TYPE.VHC_TRNS, name: '차량 운송', show: false },
  { key: CATEGORY_TYPE.SPC_RENT, name: '임대', show: false },
  { key: CATEGORY_TYPE.ROOM_RES, name: '회의실', show: false }
]

import { KMS_CONTENTS_MAX, CATEGORY_TYPE, getCategory, isEmpty, getDateStr } from '@/utils/kms'
import { registerKmsBoard, getKmsBoard, registerKmsBoardReply, getKmsBoardReply, updateKmsBoardReply, updateKmsBoard } from '@/api/kms'

export default {
  name: 'KmsEditor',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    isReply: {
      type: Boolean,
      default: false
    },
    id: {
      type: [String, Number],
      default: 0
    },
    kmsId: {
      type: [String, Number],
      default: 0
    }
  },
  data() {
    return {
      title: null,
      contents: null,
      registerId: this.$store.getters.mberId,
      kmsBoardParams: {
        kmsId: this.id,
        rPage: 1,
        rSize: 100
      },
      kmsBoardReplyParams: {
        rplId: this.id,
        registerId: this.$store.getters.mberId
      },
      kmsBoard: {
        kmsId: this.isEdit ? this.id : null,
        kmsSj: null,
        kmsCn: null,
        publicYn: null,
        kmsCtgry: CATEGORY_TYPE.DLVY,
        registerId: this.$store.getters.mberId,
        registerNm: this.$store.getters.name
      },
      kmsBoardReply: {
        rplId: null,
        rplCn: null,
        registerId: null,
        registerNm: null,
        kmsId: null,
        reltRplId: null
      },
      editorOption: {
        theme: 'snow',
        placeholder: this.isReply ? '답변 입력' : '내용 입력',
        modules: {
          toolbar: false
        }
      },
      alertOption: {
        show: true,
        content: ''
      },
      categoryOptions,
      dataLoading: false
    }
  },
  created() {
    console.log('ksmEditor id', this.id)
    console.log('ksmEditor kmsId', this.kmsId)
    console.log('ksmEditor isReply', this.isReply)
    console.log('ksmEditor isEdit', this.isEdit)
    if (this.id === 0 && this.isEdit === true) {
      alert('잘못된 접근입니다.')
      this.$router.back()
      return
    }

    if (this.isReply === false) {
      if (this.isEdit === true) {
        this.dataLoading = true
        this.getKmsBoard()
        setTimeout(() => {
          this.dataLoading = false
        }, 300)
      }
    } else {
      this.dataLoading = true
      if (this.isEdit === true) {
        this.getKmsBoardReply()
      } else {
        this.getKmsBoard()
      }
      setTimeout(() => {
        this.dataLoading = false
      }, 300)
    }
  },
  methods: {
    async getKmsBoard() {
      if (this.isReply) {
        this.kmsBoardParams.kmsId = this.kmsId
        this.kmsBoardParams.rPage = 0
        this.kmsBoardParams.rSize = 0
      }
      const response = await getKmsBoard(this.kmsBoardParams)
      console.log(response)
      const responseKmsBoard = response.resData.kmsBoard
      if (this.isReply) {
        this.kmsBoard = responseKmsBoard
      } else {
        this.title = responseKmsBoard.kmsSj
        this.contents = responseKmsBoard.kmsCn
      }
    },
    async getKmsBoardReply() {
      const response = await getKmsBoardReply(this.kmsBoardReplyParams)
      console.log(response)
      this.kmsBoardReply = response.resData
      this.contents = this.kmsBoardReply.rplCn
    },
    async completeEditor() {
      let response = null
      if (this.isReply === false) {
        if (isEmpty(this.title) || isEmpty(this.contents)) {
          this.alertOption.content = '제목 또는 내용을 입력해 주세요.'
          this.alertOption.show = true
          this.Alert(this.alertOption)
          return
        }
        this.kmsBoard.kmsSj = this.title
        this.kmsBoard.kmsCn = this.contents
        this.kmsBoard.registerId = this.registerId
        if (this.isEdit === false) {
          response = await registerKmsBoard(this.kmsBoard)
        } else {
          response = await updateKmsBoard(this.kmsBoard)
        }
        console.log(response)
        this.$router.back()
      } else {
        if (isEmpty(this.contents)) {
          this.alertOption.content = '내용을 입력해 주세요.'
          this.alertOption.show = true
          this.Alert(this.alertOption)
          return
        }
        this.kmsBoardReply.rplCn = this.contents
        this.kmsBoardReply.kmsId = this.kmsId
        this.kmsBoardReply.registerId = this.registerId
        if (this.isEdit === false) {
          response = await registerKmsBoardReply(this.kmsBoardReply)
          if (response.resCode === 1004) {
            this.alertOption.content = '1번의 답글만 가능합니다. 추가 의견은 댓글을 작성해주세요.'
            this.alertOption.show = true
            this.Alert(this.alertOption)
          }
        } else {
          this.kmsBoardReply.rplId = this.id
          response = await updateKmsBoardReply(this.kmsBoardReply)
        }
        console.log(response)
        this.$router.back()
      }
    },
    onEditorBlur(quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus(quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady(quill) {
      console.log('editor ready!', quill)
    },
    onEditorChange({ quill, html, text }) {
      // console.log('editor change!', quill, html, text, quill.getLength())
      if (html.length > KMS_CONTENTS_MAX) {
        quill.history.undo()
      }
      this.contents = quill.root.innerHTML
      this.getKmsCategory()
    },
    getKmsCategory() {
      const categoryList = getCategory()
      for (const kmsCtgry of categoryList) {
        for (var categoryOption of this.categoryOptions) {
          if (categoryOption.key === kmsCtgry) {
            categoryOption.show = true
          }
        }
      }
    },
    getDateStr(value) {
      return getDateStr(value)
    }
  }
}
</script>

<style lang="scss" scoped>
.bw input[type="text"] { height:40px;width:100%;box-sizing:border-box;border:1px solid #adb5bd;border-radius:3px;padding-left:10px;color:black;font-size:14px;font-weight:normal; font-family: 'Noto Sans KR', sans-serif !important; margin-bottom:10px; }
.bw input[type="text"]::placeholder { font-size:14px;font-weight:normal; font-family: 'Noto Sans KR', sans-serif !important; color:#ADB5BD }

.quill-editor {
  height: 229px;
  padding: 0px;
  font-family: 'Noto Sans KR', sans-serif !important;
  font-weight: normal;
  color: black;
  font-size: 14px;
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
  font-size: 14px;
  left: 10px;
  right: 10px;
}
.quill-editor >>> .ql-editor {
  font-family: 'Noto Sans KR', sans-serif !important;
  font-weight: normal;
  color: black;
  font-size: 14px;
  resize:none;
  outline:none;
  padding: 10px;
}
</style>
