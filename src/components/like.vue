<template>
  <div>
    <div class="container" @click="onLike">
      <img :src="likeStatus ? yes_url : no_url" class="img" />
      <span class="num">{{ likeCount }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'like',
    props: {
      like: Boolean,
      count: Number,
      readOnly: Boolean,
    },

    data() {
      return {
        // 也可以通过impoet导入，直接引用会导致打包加上hash值导致引用失败
        yes_url: require('./images/like.png'),
        no_url: require('./images/like@dis.png'),
        likeStatus: this.like,
        likeCount: this.count,
        flag: false,
      }
    },
    computed: {
      receive_like() {
        return this.likeStatus
      },
    },
    watch: {
      like(newVal) {
        this.flag = false
        this.likeStatus = JSON.parse(JSON.stringify(newVal))
      },
      count(newVal) {
        this.flag = false
        this.likeCount = JSON.parse(JSON.stringify(newVal))
      },
    },

    methods: {
      onLike() {
        // 只读
        if (this.readOnly) {
          return
        }
        if (!this.flag) {
          this.flag = true
          this.likeStatus = !this.like
          this.likeCount = this.like ? this.count - 1 : this.count + 1
        } else {
          this.likeCount = this.likeStatus
            ? this.likeCount - 1
            : this.likeCount + 1
          this.likeStatus = !this.likeStatus
        }
        let behavior = this.likeStatus ? 'like' : 'cancel'
        this.$emit('like', behavior)
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
