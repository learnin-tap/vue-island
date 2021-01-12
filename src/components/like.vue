<template>
  <div>
    <div class="container" @click="onLike">
      <img
        v-if="receive_count"
        :src="receive_like ? yes_url : no_url"
        class="img"
      />
      <img v-else :src="like ? yes_url : no_url" class="img" />
      <span class="num">{{ receive_count ? receive_count : count }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'like',
    props: {
      like: Boolean,
      count: Number,
      // readOnly: Boolean,
    },
    data() {
      return {
        // 也可以通过impoet导入，直接引用会导致打包加上hash值导致引用失败
        yes_url: require('./images/like.png'),
        no_url: require('./images/like@dis.png'),
        receive_like: this.like,
        receive_count: this.count,
        flag: 0,
      }
    },
    mounted() {
      // this.receive_like = this.like;
      // this.receive_count = this.count;
      // console.log("子组件 mounted");
    },
    methods: {
      onLike() {
        if (!this.flag) {
          // 第一次进入则取接口的数据
          this.receive_count = this.like ? this.count - 1 : this.count + 1
          this.receive_like = !this.like
        } else {
          //否则用自己控制的数据
          this.receive_count = this.receive_like
            ? this.receive_count - 1
            : this.receive_count + 1
          this.receive_like = !this.receive_like
        }
        let behavior = this.receive_like ? 'like' : 'cancel'
        this.$emit('like', behavior)
        this.flag++
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .container
  	display inline-flex
  	flex-direction row
  	width 1rem
  	padding .1rem
  	.num
  		font-size .24rem
  		color #bbbbbb
  		line-height .24rem
  		position relative
  		bottom .1rem
  		left .06rem
  	.img
  		width .32rem
  		height .28rem
</style>
