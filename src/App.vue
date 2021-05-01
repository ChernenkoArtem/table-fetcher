<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/peiko-logo-mini.png">
    <h1>Test</h1>
    <hr>
    <BtnGetTable
        :getDataBtnClick="getDataBtnClick"
    />
    <div class="loading" v-if="isLoading">loading...</div>
    <template v-if="!stocksDataError">
      <Table
          :formatedStocksData="formatedStocksData"
      />
    </template>
    <div v-else>no data</div>
  </div>
</template>

<script>
import BtnGetTable from "@/components/BtnGetTable";
import simulateAsyncReq from "@/plugins/getDataFunc";
import {payload} from "@/mocData";
import Table from "@/components/Table";

export default {
  name: 'App',
  components: {Table, BtnGetTable},
  data(){
    return {
      stocksData: {} ,
      formatedStocksData:[],
      stocksDataError: false,
      isLoading: false
    }
  },
  methods: {
    async getData() {
      try {
        this.stocksDataError = false
        this.stocksData = await simulateAsyncReq(payload)
        this.formatedStocksData = this.formatStocksData()
      } catch (err){
        this.stocksDataError = true
        this.formatedStocksData = []
        console.log('error data',err)
      }
    },
    formatStocksData() {
      const maxLength = Math.max(this.stocksData.stocks.length, this.stocksData.start.length, this.stocksData.current.length)
      const arr = []
      for (let i = 0;i < maxLength;i++){
        arr.push({
          stocks: this.stocksData.stocks[i],
          current: this.normalizeNumber(this.stocksData.current[i]),
          change:this.normalizeNumber(this.stocksData.start[i].toFixed(2)  - this.stocksData.current[i].toFixed(2),true)
        })
      }
      arr.sort((a,b)=> {
        return a.stocks.localeCompare(b.stocks);
      })

      return arr
    },
    normalizeNumber(number, flag) {
      const res = number.toFixed(2)
      if (flag)  return res >= 0 ? '+' + res : res
      return res
    },
    async getDataBtnClick() {
      this.isLoading = true
      await this.getData()
      this.isLoading = false
    }
  }

}
</script>

<style lang="scss">
*{
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  .loading{
    margin: 20px 20px;
    font-size: 30px;
  }
}
</style>
