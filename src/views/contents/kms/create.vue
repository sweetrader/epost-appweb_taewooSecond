<template>
  <kms-editor :id="id" :is-edit="false" :is-reply="isReply" :kms-id="kmsId"/>
</template>

<script>
import KmsEditor from './components/kmsEditor'

export default {
  name: 'CreateKmsEditor',
  components: { KmsEditor },
  props: {
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
  created() {
    console.log('CreateKmsEditor id', this.id)
    console.log('CreateKmsEditor kmsId')
    // console.log('CreateKmsEditor isReply', this.isReply)
    // console.log('CreateKmsEditor isEdit', this.isEdit)
  }
}
</script>

