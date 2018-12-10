<template>
  <div class="page">
    <h3 class="title">{{ msg }}</h3>
    <div v-for="(item, index) in problems" :key="index">
      <rTitle :title="item.title"></rTitle>
      <rCodeView :codes="item.codes"></rCodeView>
    </div>
  </div>
</template>

<script>
  import rTitle from './title.vue';
  import rCodeView from './codeView.vue';

  export default {
    name: 'jsView',
    components: {rTitle, rCodeView},
    data() {
      return {
        msg: 'js问题1',
        problems: [
          {
            title: 'JavaScript中如何检测一个变量是一个String类型？请写出函数实现',
            codes: [
              'typeof(obj) === "string"',
              'typeof obj === "string"',
              'obj.constructor === String',
            ],
          },
          {
            title: '请用js去除字符串空格？',
            codes: [
              '去除所有空格: str = str.replace(/\\s*/g,"");',
              '去除两头空格: str = str.replace(/^\\s*|\\s*$/g,"");',
              '去除左空格： str = str.replace( /^\\s*/, “”);',
              '去除右空格： str = str.replace(/(\\s*$)/g, "");',
              'var str = " 23 23 ";',
              'var str2 = str.replace(/\s*/g,"");',
              'console.log(str2); // 2323',
              '//',
              'str.trim()',
              'str.trimLeft()',
              'str.trimRight()',
            ],
          },
        ],
      };
    },
  };
</script>

<style>

</style>
