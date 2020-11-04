<template>
  <div>
    <div v-show="display" class="classic-container">
      <img :src="img" class="classic-img" alt="" />
      <img class="tag" src="./images/movie@tag.png" alt="" />
      <span class="content">{{ content }}</span>
    </div>
  </div>
</template>

<script>
import { classicBeh } from "@utils/mixin";
export default {
  name: "movie",
  mixins: [classicBeh],
};
</script>

<style lang="stylus">
@import '~@styles/classic-common.styl'
.classic-container
	classic-container()
	.classic-img
		classic-img()
	.tag
		tag()
	.content
		content()
</style>
