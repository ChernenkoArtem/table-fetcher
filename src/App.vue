<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/peiko-logo-mini.png">
    <h1>Test</h1>
    <hr>
    <BtnGetTable
        @click.native="getDataBtnClick"
    />
    <div class="loading" v-if="isLoading">loading...</div>
    <template v-if="!this.$store.getters.getStocksDataError">
      <Table
          :formatedStocksData="this.$store.getters.getFormatStocksData"
      />
    </template>
    <div v-else>no data</div>
  </div>
</template>

<script>
import BtnGetTable from "@/components/BtnGetTable";
import Table from "@/components/Table";

export default {
  name: 'App',
  components: {Table, BtnGetTable},
  data(){
    return {
      isLoading: false
    }
  },
  methods: {
    async getDataBtnClick() {
      this.isLoading = true
      await this.$store.dispatch('getData')
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
