<template>
  <div class="app-container">
    <header>
      <a href="#" class="back"/><h1>채팅</h1>
    </header>
    <div class="top10_list">
      <!-- <div class="chatting_list_cell">
        <div class="face_small"></div>
        <b>중앙우체국담당자</b>
        <span>금일 배송업무 가능하신가요? 글자수 제한</span>
        <div class="dd">2020-08-25<br>오후 10:56</div>
      </div> -->

      <div v-for="room in chttRoomList" :key="room.roomId">
        <div class="chatting_list_cell">
          <div class="face_small"/>
          <b>ads</b>
          <span>으흠</span>
          <div class="dd">
            {{ room.registDt }}<br>
            123123</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import chtt from '@/api/chtt'

export default {
  name: 'ChttRoomList',
  components: {},
  data() {
    return {
      isLoading: false,
      reqData: {
        userId: 'narae'
      },
      chttRoomList: null
    }
  },
  created() {
    this.getChttRoomList()
  },
  methods: {
    async getChttRoomList() {
      this.isLoading = true
      const { resData } = await chtt.getChttRoomList(this.reqData)

      this.chttRoomList = resData
      console.log(resData)

      this.isLoading = false
    }
  }
}
</script>

<style>

</style>
