<template>
  <div class="xc-slider">
    <div class="linea-slider"
         :class="{'s-d': disabled}"
         @click="clickLinea"
         ref="lineaSlider">
      <div class="linea-pintada"
           ref="lineaPintada"
           :style="{backgroundColor: color, width: `${sliderValue}%`, maxWidth: ancho ? `${ancho}px` : 'auto'}"
      >
        <div
          class="circle-slider"
          ref="circle"
          @mousedown="mousedownx"
          @touchstart="mousedownx($event)"
          @keydown.left="onLeftKeyDown"
          @keydown.right="onRightKeyDown"
        >
          <span class="circle-interno" :style="{border: `2px solid ${color}`}"></span>
          <div class="xc-numero-slider" v-if="notPrecentage">
            <span :style="{color}">{{Math.round(sliderValue) > 100 ? 100 : Math.round(sliderValue)}} {{notPrecentage ? '%' : ''}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'xc-vue-slider',
    props: {
      value: {
        type: Number,
        default: 0
      },
      disabled: {
        type: [Boolean, String],
        default: false
      },
      color: {
        type: String,
        default: 'rgb(31, 116, 255)'
      },
      min: {
        type: Number,
        default: 1
      },
      step: {
        type: Number,
        default: 1
      },
      notPrecentage: {
        type: [Boolean, String],
        default: false
      }
    },
    data () {
      return {
        sliderValue: this.value,
        ancho: 0,
        valuex: 0
      }
    },
    watch: {
      sliderValue (value) {
        this.$emit('change', value)
      }
    },
    created () {
      this.sliderValue = this.value
    },
    mounted () {
      this.ancho = this.$refs.lineaSlider.offsetWidth
      window.addEventListener('resize', this.resizex)
    },
    methods: {
      resizex () {
        this.ancho = this.$refs.lineaSlider.offsetWidth
        this.setSliderValue(this.sliderValue)
      },
      setSliderValue (value) {
        if (value <= 100 && value >= 0) {
          this.sliderValue = value
        }
      },
      // get currentValue
      getCurrentValue (clientX, offsetLeft) {
        return Math.round((clientX - offsetLeft) / this.ancho * 100)
      },
      // line click
      clickLinea (event) {
        const {className} = event.target
        if (className !== 'linea-slider' && className !== 'linea-pintada' || this.disabled) {
          return
        }
        const linea = this.$refs.lineaSlider
        const offsetLeft = linea.getBoundingClientRect().left
        const value = this.getCurrentValue(event.clientX, offsetLeft)
        this.setSliderValue(value)
        this.$emit('input', value + 1)
      },
      mousedownx () {
        window.addEventListener('mousemove', this.mouseMovex)
        window.addEventListener('mouseup', this.removeEvents)
        window.addEventListener('touchmove', this.mouseMovex)
        window.addEventListener('touchend', this.removeEvents)
      },
      mouseMovex () {
        /* eslint-disable */
        if (this.disabled) {
          return
        }
        let linea = this.$refs.lineaSlider
        let circle = this.$refs.circle
        let x
        if (event.type === 'touchmove') {
          x = event.targetTouches[0].clientX
        } else {
          x = event.clientX
        }
        let valorx = x - (linea.getBoundingClientRect().left - circle.offsetWidth/2)
        if (this.min) {
          if ((valorx / this.ancho) * 100 <= this.min) {
          }
        }
        if (Math.sign(valorx) === -1) {
          valorx = 0
        }
        if (valorx > this.ancho) {
          valorx = this.ancho
        }

        this.valuex = valorx
        const value = Math.round((valorx / this.ancho) * 100)
        this.setSliderValue(value)
        this.$emit('input', value)
      },
      removeEvents () {
        if (this.disabled) {
          return
        }
        const value = Math.round((this.valuex / this.ancho) * 100)
        this.setSliderValue(value)
        this.$emit('input',value)
        window.removeEventListener('mousemove', this.mouseMovex)
        window.removeEventListener('mouseup', this.removeEvents)
        window.removeEventListener('touchmove', this.mouseMovex)
        window.removeEventListener('touchend', this.removeEvents)
      }
    }
  }
</script>

<style>
  .s-d {
    cursor: default;
  }
  .s-d .circle-slider {
    background-color: rgb(200, 200, 200)!important;
    cursor: default;
  }
  .s-d .circle-interno {
    opacity: 0;
  }
  .s-d .circle-slider .xc-numero-slider {
    background-color: rgb(60, 60, 60)!important;
  }
  .s-d .linea-pintada {
    background-color: rgb(200, 200, 200)!important;
  }
  .xc-slider {
    width: 100%;
    padding: 10px;
  }
  .linea-slider {
    width: 100%;
    position: relative;
    background-color: rgb(235, 235, 235);
    height: 6px;
    border-radius: 3px;
    cursor: pointer;
  }
  .linea-pintada {
    width: 0px;
    height: 100%;
    position: relative;
  }
  .circle-slider {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    border-radius: 50%;
    transition: transform .3s ease;
    backface-visibility: visible;
    background-color: rgb(255, 255, 255);
    right: 0;
  }
  .circle-interno {
    position: absolute;
    left: 0%;
    top: 0%;
    transform: scale(1);
    width: 18px;
    height: 18px;
    border-radius: 50%;
    transition: all .3s ease;
    background: rgb(255, 255, 255);
    backface-visibility: hidden;
    box-sizing: border-box;
  }
  .xc-numero-slider {
    position: absolute;
    top: -8px;
    left: 50%;
    z-index: 300;
    transform: translate(-50%, -50%) scale(.5);
    padding: 4px;
    border-radius: 5px;
    transition: all .3s ease;
    width: 78px;
  }
  .xc-numero-slider span {
    font-size: 24px;
  }
</style>

