<template>
  <div :class="$style.container" :style="style">
    <transition name="fade">
      <img v-if="showPlaceholder" :class="$style.placeholder" :src="placeholderSrc" alt="placeholder"/>
    </transition>
    <imgine-image
      :class="$style.image"
      v-bind="$props"
      @load="onLoad"
      @error="onError"
      @preload="$emit('preload', $event)"
    />
  </div>
</template>

<script>
  import ImgineImage from './imgine-image.vue'
  import mixin from './imine.mixin'
  import './imgine-container.module.css'

  export default {
    name: 'ImgineContainer',
    mixins: [mixin],
    components: {
      ImgineImage
    },
    props: {
      blur: {
        type: [String, Number],
        default: 2
      }
    },
    data () {
      return {
        loaded: false,
        error: false
      }
    },
    computed: {
      aspect () {
        return this.height / this.width
      },
      style () {
        return {
          '--image-aspect': `${this.aspect * 100}%`
        }
      },
      placeholderSrc () {
        return this.$imgine.format(this.src, { w: 20, b: this.blur, f: null })
      },
      showPlaceholder () {
        return this.placeholder && !this.loaded
      }
    },
    methods: {
      onLoad () {
        this.loaded = true
        this.$emit('load')
      },
      onError () {
        this.error = true
        this.$emit('error')
      }
    }
  }
</script>
