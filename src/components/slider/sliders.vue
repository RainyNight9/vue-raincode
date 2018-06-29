<template>
  <div class="page">
    <h3 class="title">{{ msg }}</h3>

    <div id="sliders" :style="{'text-align': 'center'}">
      <div class="main">
        <vue-slider v-model="sliderValue" />
        <div class="main-result">{{sliderValue}}</div>
      </div>
      <div class="main">
        <vue-slider :value="sliderValue1" @change="change" />
        <div class="main-result">{{sliderValue1}}</div>
      </div>
      <div class="main">
        <vue-slider v-model="sliderValue2" notPrecentage />
        <div class="main-result">{{sliderValue2}}</div>
      </div>
      <div class="main">
        <vue-slider v-model="sliderValue3" :color="color" />
        <div class="main-result" style="margin-right: 30px">{{sliderValue3}}</div>
        <input type="color" v-model="color">
      </div>
      <div class="main">
        <vue-slider disabled v-model="sliderValue4" />
        <div class="main-result">{{sliderValue4}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import vueSlider from './vueSlider';

  export default {
    name: 'sliders',
    data: () => ({
      msg: '多个滑动',
      sliderValue: 40,
      sliderValue1: 30,
      sliderValue2: 20,
      sliderValue3: 60,
      sliderValue4: 50,
      sliderValue5: 70,
      color: '#ff8000',
    }),
    components: {
      vueSlider,
    },
    methods: {
      change(value) {
        this.sliderValue1 = value;
      },
    },
  };
</script>

<style>
  .main {
    width: 80%;
    margin: 30px auto;
    display: flex;
    justify-content: space-around;
  }
</style>
