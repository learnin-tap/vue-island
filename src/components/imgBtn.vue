<template>
  <div v-copy="copyText">
    <button class="container">
      <slot name="img"></slot>
    </button>
  </div>
</template>
<script>
  export default {
    name: 'imgBtn',
    data() {
      return {
        copyText: location.href,
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .container
    padding 0 !important
    border none !important
    background transparent
</style>
