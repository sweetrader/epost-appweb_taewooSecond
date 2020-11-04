<template>
  <div class="app-container">
    <div class="search_address_form">
      <!-- 타이틀 -->
      <div class="search_header_area">
        <div class="empty_search_header"/>

        <div class="header_text white_space">
          {{ text.title }}
        </div>

        <img src="@/assets/image/close_button.png" class="close_address_icon" @click="justClose">
      </div>

      <!-- 선택 종류 -->
      <div class="select_type_area" align="center">
        <table>
          <thead>
            <th>
              <td :class="lotNoClass" @click="clickType('lot')">
                {{ text.lotNo }}
              </td>
              <td :class="roadNmClass" @click="clickType('road')">
                {{ text.roadNm }}
              </td>
            </th>
          </thead>
        </table>
      </div>

      <div class="gbn_style">
        {{ text.gbn }}
      </div>

      <!-- 지번주소 폼 -->
      <div v-if="selectType === '지번주소'">
        <select v-model="lotNoFindInfo.type" class="select_box_long_address">
          <option v-for="item in lotType" :key="item.value" :hidden="item.hidden">{{ item.title }}</option>
        </select>
        <input
          v-model="lotNoFindInfo.keyword1"
          :placeholder="text.placeholder.gbn1"
          type="text"
          class="text_input white_space_half">
        <input
          v-model="lotNoFindInfo.keyword2"
          :placeholder="text.placeholder.gbn2"
          type="text"
          class="text_input white_space_half">

        <div class="address_empty_area"/>

        <img src="@/assets/image/search_bar.png" class="search_bar" @click="findAddress(lotNoFindInfo, selectType)">
      </div>

      <!-- 도로명 주소 폼 -->
      <div v-if="selectType === '도로명주소'">
        <select v-model="roadNmFindInfo.type" class="select_box_long_address">
          <option v-for="item in lotType" :key="item.value" :hidden="item.hidden">{{ item.title }}</option>
        </select>
        <input
          v-model="roadNmFindInfo.keyword1"
          :placeholder="text.placeholder.gbn1"
          type="text"
          class="text_input white_space_half">
        <input
          v-model="roadNmFindInfo.keyword2"
          :placeholder="text.placeholder.roadNm"
          type="text"
          class="text_input white_space_half">

        <div class="build_info_area">
          <input
            v-model="roadNmFindInfo.buildingNo"
            :placeholder="text.placeholder.buildingNo"
            type="text"
            class="text_input build_no white_space_half">
          <input
            v-model="roadNmFindInfo.buildingNm"
            :placeholder="text.placeholder.buildingNm"
            type="text"
            class="text_input build_nm white_space_half">
        </div>

        <div class="address_empty_area"/>

        <img src="@/assets/image/search_bar.png" class="search_bar" @click="findAddress(roadNmFindInfo, selectType)">
      </div>

      <!-- 검색 결과 -->
      <div v-if="searchResult.length > 0" class="search_result_area">
        <div class="result_text white_space_half">{{ text.resultGuide }}</div>
        <div v-for="(index, i) in searchResult" :key="i" class="result_text address" @click="selectAddress(index)">
          {{ index }}
        </div>
      </div>

      <!-- 빈공간 -->
      <div class="empty_area"/>
    </div>
  </div>
</template>

<script>
let app = null

export default {
  name: 'SearchAddress',
  directives: {},
  components: {},
  filters: {

  },
  props: {
    justClose: {
      type: Function,
      default: null
    },
    selectAddress: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      text: {
        title: '주소검색',
        lotNo: '지번주소',
        roadNm: '도로명주소',
        gbn: '시/도',
        placeholder: {
          gbn1: '시/군/수',
          gbn2: '읍/면/동',
          roadNm: '도로명 : 예)  하나2가길(○), 하나2가(x)',
          buildingNo: '건물번호',
          buildingNm: '건물명'
        },
        resultGuide: '* 해당하는 주소를 클릭하시면 자동 입력됩니다.'
      },
      selectType: '지번주소',
      lotNoClass: 'lot_no line_on',
      lotNoFindInfo: {
        type: '선택',
        keyword1: '',
        keyword2: ''
      },
      lotType: [
        {
          title: '선택',
          hidden: true // 선택 안함
        },
        {
          title: '1구분',
          hidden: false // 선택 안함
        },
        {
          title: '2구분',
          hidden: false // 선택 안함
        }
      ],
      roadNmClass: 'road_nm center_line_left_on',
      roadNmFindInfo: {
        type: '선택',
        keyword1: '',
        keyword2: '',
        buildingNo: '',
        buildingNm: ''
      },
      roadType: [
        {
          title: '선택',
          hidden: true // 선택 안함
        },
        {
          title: '1구분',
          hidden: false // 선택 안함
        },
        {
          title: '2구분',
          hidden: false // 선택 안함
        }
      ],
      searchResult: []
    }
  },
  computed: {

  },
  watch: {

  },
  created() {
    app = this
  },
  methods: {
    // 검색 유형
    clickType(type) {
      app.searchResult = []
      switch (type) {
        case 'lot':
          app.lotNoClass = 'lot_no line_on'
          app.roadNmClass = 'road_nm center_line_left_on'
          app.selectType = '지번주소'
          break
        case 'road':
          app.lotNoClass = 'lot_no center_line_right_on'
          app.roadNmClass = 'road_nm line_on'
          app.selectType = '도로명주소'
          break
      }
    },
    // 주소 검색
    findAddress(data, type) {
      console.log(data)
      console.log(type)
      const result = '경기도 성남시 분당구 판교동'
      app.searchResult = []
      app.searchResult.push(result)
      app.searchResult.push(result)
      app.searchResult.push(result)
      app.searchResult.push(result)
      app.searchResult.push(result)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.search_address_form {
  z-index: 2000;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  width: calc(100% - 1.06rem);
  min-height: 100vh;
  max-height: 100vh;
  padding: 0.75rem 0.53rem 0 0.53rem;
  overflow-y: auto;

  .search_header_area {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.67rem;
    .empty_search_header {
      width: 0.34rem;
      height: 0.34rem;
      margin-top: 0.05rem;
      margin-left: 0.24rem;
    }
    .header_text {
      font-size: 0.53rem;
      line-height: 0.53rem;
      font-family: 'hanaB';
    }
    .close_address_icon {
      width: 0.34rem;
      height: 0.34rem;
      margin-top: 0.05rem;
      margin-right: 0.24rem;
    }
  }

  .select_type_area {
    display: flex;
    margin-bottom: 0.76rem;
    table {
      width: 8.93rem;
      line-height: 1.18rem;
      vertical-align: middle;
      border-spacing: 0;
      font-size: 0.46rem;
      font-family: 'hanaB';
      color: #AFAFAF;
      td {
        width: 4.48rem;
        height: 1.18rem;
      }
    }
    .lot_no {
      border-top: 2px solid #E3E3E3;
      border-left: 2px solid #E3E3E3;
    }
    .road_nm {
      border-top: 2px solid #E3E3E3;
      border-right: 2px solid #E3E3E3;
    }
    .line_on {
      border-top: 2px solid #1FB1A7;
      border-right: 2px solid #1FB1A7;
      border-left: 2px solid #1FB1A7;
      color: #1FB1A7 !important;
    }
  }

  .gbn_style {
    font-size: 0.43rem;
    line-height: 0.43rem;
    font-family: 'hanaB';
    margin-bottom: 0.37rem;
  }

  // 검색 공통
  .select_box_long_address {
    width: 8.93rem;
    height: 1.18rem;
    border: 0px;
    background: url('~@/assets/image/select_long.png') no-repeat 95% 50%;
    background-size: 100% 100%;
    /* 네이티브 외형 감추기 */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding-left: 0.45rem;
    margin-bottom: 0.31rem;
    font-size: 0.39rem;
    line-height: 0.5rem;
    color: #373737;
  }
  .address_empty_area {
    height: 0.67rem;
  }
  .search_bar {
    width: 8.93rem;
    height: 1.18rem;
    margin-bottom: 0.96rem;
  }

  // 인풋
  .text_input {
    width: 8.48rem;
    height: 1.18rem;
    border: none;
    margin-bottom: 0.31rem;
    padding-left: 0.45rem;
    font-size: 0.39rem;
    line-height: 0.5rem;
    color: #373737;
    background-color: #F6F6F6;
    /* 네이티브 외형 감추기 */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  .text_input::placeholder {
    font-size: 0.39rem;
    line-height: 0.5rem;
    color: #AFAFAF;
  }

  // 지번 주소
  .build_info_area {
    width: 8.93rem;
    display: flex;
    justify-content: space-between;
    .build_no {
      width: 2.28rem !important;
      margin-right: 0.26rem;
    }
    .build_nm {
      width: 6.29rem !important;
    }
  }

  // 검색 결과
  .search_result_area {
    .result_text {
      font-size: 0.39rem;
      line-height: 0.5rem;
      color: #FF3737;
      padding-bottom: 0.39rem;
      margin-bottom: 0.39rem;
      border-bottom: 1px solid #AFAFAF;
    }
    .address {
      color: #373737 !important;
    }
  }
  .empty_area {
    height: 1.5rem;
  }
}
</style>
