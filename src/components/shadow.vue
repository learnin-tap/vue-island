<template>
  <div>
    <div class="container"></div>
  </div>
</template>
<script>
export default {
  name: "Shadow",
};
</script>
<style lang="stylus" scoped>
.container
	background #000
	position fixed
	top 0
	opacity .6
	width 100%
	height 100%
	z-index 100
</style>
