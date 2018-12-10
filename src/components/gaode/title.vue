<template>
  <div class="rain-title">
    {{title}}
  </div>
</template>

<script>
  export default {
    name: 'title',
    props: ['title'],
  };
</script>

<style>
  .rain-title{
    height: 30px;
    line-height: 30px;
    font-size: 20px;
    font-weight: bolder;
    color: #222;
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
