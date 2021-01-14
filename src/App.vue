<template>
  <div id="app">
    <Header class="header" />
    <keep-alive :exclude="['My', 'book-detail', 'classic-detail']">
      <router-view />
    </keep-alive>
    <Footer />
  </div>
</template>

<script>
  import Header from '@/components/_header'
  import Footer from '@/components/_footer'
  export default {
    components: {
      Header,
      Footer,
    },
  }
</script>
<style lang="stylus" scoped>
  // .header
  // 	position fixed
  // 	top 0
  // 	background green
  // 	z-index 101
</style>
