<template>
  <div style="display:flex;justify-content:center">
    <div class="container">
      <img
        @click="onLeft"
        class="icon"
        :src="latest ? disLeftSrc : leftSrc"
        alt=""
      />
      <span class="title">{{ title }}</span>
      <img
        @click="onRight"
        class="icon"
        :src="first ? disRightSrc : rightSrc"
        alt=""
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'navi',
    props: {
      title: String,
      first: Boolean,
      latest: Boolean,
    },
    data() {
      return {
        disLeftSrc: require('./images/triangle.dis@left.png'),
        leftSrc: require('./images/triangle@left.png'),
        disRightSrc: require('./images/triangle.dis@right.png'),
        rightSrc: require('./images/triangle@right.png'),
      }
    },
    methods: {
      onLeft() {
        if (!this.latest) {
          this.$emit('left')
        }
      },
      onRight() {
        if (!this.first) {
          this.$emit('right')
        }
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .container
  	width 6rem
  	height 0.8rem
  	background #f7f7f7
  	border-radius .02rem
  	display inline-flex
  	flex-direction row
  	justify-content space-between
  	align-items center
  	.icon
  		width .8rem
  		height .8rem
  	.title
  		font-size .28rem
</style>
