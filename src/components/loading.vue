<template>
  <div>
    <div class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style lang="stylus" scoped>
.spinner
	width .4rem
	height .4rem
	position relative
	.double-bounce1, .double-bounce2
		width 100%
		height 100%
		border-radius 50%
		background #3063b2
		opacity .6
		position absolute
		top 0
		left 0
		animation bounce 2.0s infinite ease-in-out
	.double-bounce2
		animation-delay -1.0s
	@keyframes bounce
		0%, 100%
			transform scale(0.0)
		50%
			transform scale(1.0)
</style>
