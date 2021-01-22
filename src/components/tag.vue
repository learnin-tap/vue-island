<template>
  <div>
    <div @click="onTap" class="container" :style="this.tagClass">
      <span>{{ text }}</span>
      <slot name="after"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tag',
    props: ['text', 'tagClass'],
    methods: {
      onTap() {
        this.$emit('tapping', this.text)
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .container
    padding .04rem .12rem
    background #f5f5f5
    color #666
    border-radius 0.4rem
    display inline-flex
    flex-direction row
    align-items center
    justify-content center
    font-size 0.28rem
</style>
