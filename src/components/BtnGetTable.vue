<template>
<button @click="$emit('click')">Get data</button>
</template>

<script>
export default {
  name: "BtnGetData"
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