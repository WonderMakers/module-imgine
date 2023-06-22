<template>
  <picture>
    <source
      v-for="format in formats"
      :key="format"
      :srcset="getSrcset(format)"
      :sizes="sizes.join(', ')"
      :type="`image/${format}`"
    >
    <source :srcset="getSrcset()" :sizes="sizes.join(', ')">
    <img
      ref="image"
      :class="$style.image"
      :src="src"
      :alt="alt"
      :loading="loading"
      @load="onLoad"
      @error="onError"
    >
  </picture>
</template>

<script>
  // Doc: https://medium.com/@woutervanderzee/responsive-images-with-srcset-and-sizes-fc434845e948
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture
  import mixin from './imine.mixin'
  import './imgine-image.module.css';
  export default {
    name: 'ImgineImage',
    mixins: [mixin],
    computed: {
      currentSrc () {
        return this.$refs.image.currentSrc || this.$refs.image.src
      }
    },
    methods: {
      getSrcset (f = null) {
        return this.map.map(w => this.$imgine.format(this.src, { w, f }) + ` ${w}w`).join(', ')
      },
      onLoad () {
        this.$emit('load')
      },
      onError () {
        this.$emit('error')
      }
    },
    mounted () {
      this.$emit('preload', { type: 'image', src: this.currentSrc })
      if (this.$refs.image.complete) {
        this.onLoad()
      }
    }
  }
</script>
