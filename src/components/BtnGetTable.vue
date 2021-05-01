<template>
<button @click="btnDataHandler">Get data</button>
</template>

<script>
export default {
  name: "BtnGetData",
  props:['getDataBtnClick'],
  methods:{
    btnDataHandler() {
      this.getDataBtnClick()
    }
  }
}
</script>

<style lang="scss" scoped>
button{
  padding: 8px 25px;
  border: 1px solid #000;
  font: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
}
</style>