<template>
  <div class="codeView">
    <p v-for="(item, index) in codes" :key="index">{{item}}</p>
  </div>
</template>

<script>
  export default {
    name: 'codeView',
    props: ['codes'],
  };
</script>

<style>
  .codeView{
    background-color: rgb(245,245,245);
    font-size: 16px;
    color: #ea6f5a;
    border: 1px solid rgb(204,204,204);
    overflow: auto;
    padding: 10px 20px;
  }
</style>
