<template>
  <div v-if="formatedStocksData.length"
      class="table">
    <div class="table__titles">
      <div class="cell">Stock</div>
      <div class="cell">Current</div>
      <div class="cell">Change</div>
    </div>
    <div
        v-for="stock in formatedStocksData"
        v-bind:key="stock.stocks"
        class="table__main">
      <div class="table__row">
        <div class="cell">{{stock.stocks}}</div>
        <div class="cell">{{stock.current}}</div>
        <div
            :class="{negativeChange: stock.change < 0}"
            class="cell change">{{stock.change}}</div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "Table",
  props:['formatedStocksData']
}
</script>

<style lang="scss" scoped>
.table{
  width: 350px;
  color: black;
  margin: 0 auto;
  margin-top: 20px;
  border: 1px solid darkgray;
  &__titles {
    display: flex;
    width: 100%;
    font-weight: 600;
    justify-content: space-between;
  }
  &__main{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .table__row{
      display: flex;
      width: 100%;
      border-top: 1px solid darkgray;
      .change{
        color: green;
      }
      .negativeChange{
        color: red;
      }
    }
  }
  .cell{
    padding: 8px 15px;
    width: 100%;
  }
}
</style>