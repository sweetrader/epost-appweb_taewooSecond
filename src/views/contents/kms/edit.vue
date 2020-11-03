<template>
  <kms-editor :id="id" :is-edit="true" :is-reply="isReply" :kms-id="kmsId"/>
</template>

<script>
import KmsEditor from './components/kmsEditor'

export default {
  name: 'EditKmsEditor',
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
    console.log(this.isReply)
    console.log(this.id)
    console.log(this.kmsId)
  }
}
</script>

