<template>
  <div id="filter_bar">
    <dl class="region_filter_section">
      <dt v-if="totalAmount > 0" class="total-amount">총 {{ totalAmount }} 건</dt>
      <dt v-else class="address-wraper">지역선택</dt>
      <dt class="select-wraper">
        <p class="place-holder" @click="open = true">{{ selectNm }}</p>
      </dt>
      <dt class="filter-wraper"/>
    </dl>
    <SelectBox :open="open" :header="header" :option-list="optionList" @select="onClickOptionBtn"/>

  </div>
</template>

<script>
import SelectBox from '@/components/space/SelectBox/Index'
export default {
  components: {
    SelectBox
  },
  props: {
    header: {
      type: String,
      default: ''
    },
    optionList: {
      type: Array,
      default: null
    },
    selectPlaceHolder: {
      type: String,
      default: ''
    },
    totalAmount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      open: false,
      selectNm: ''
    }
  },
  created() {
    this.selectNm = this.selectPlaceHolder
  },
  methods: {
    onClickOptionBtn(option) {
      this.open = false
      if (option !== '') {
        this.selectNm = option
      }
    }
  }
}
</script>
