<template>
  <div id="filter_bar">
    <dl class="region_filter_section">
      <dt class="total-amount">총 {{ totalAmount }} 건</dt>
      <dt class="select-wraper">
        <p class="place-holder" @click="open = true">{{ selectNm }}</p>
      </dt>
      <dt class="filter-wraper" @click="onFilterView"/>
    </dl>
    <SelectBox :open="open" :header="header" :option-list="optionList" @select="onClickOptionBtn"/>

  </div>
</template>

<script>
import SelectBox from '@/components/SelectBox/Index'
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
    },
    filterRouterName: {
      type: String,
      default: ''
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
  mounted() {
  },
  methods: {
    onClickOptionBtn(option) {
      this.open = false
      if (option !== '') {
        this.selectNm = option
      }
    },
    onFilterView() {
      if (this.filterRouterName) {
        this.$router.push({ name: this.filterRouterName })
        return false
      }
      this.$router.push('/filter')
    }
  }
}
</script>
