<template>
  <div class="container" @click="onTap">
    <div class="head">
      <Tag :text="typeText" :tagClass="tagStyle" />
      <Like
        :count="classic.fav_nums"
        :like="true"
        :readOnly="true"
        class="like"
      />
    </div>
    <img :src="classic.image" :class="img_class" />
    <div class="text">{{ classic.content }}</div>
  </div>
</template>

<script>
  import Tag from '@/components/tag'
  import Like from '@/components/like'
  export default {
    name: 'Preview',
    components: {
      Tag,
      Like,
    },
    props: {
      classic: Object,
    },
    computed: {
      typeText() {
        let enums = { 100: '电影', 200: '音乐', 300: '句子' }
        return enums[this.classic.type]
      },
      img_class() {
        if (this.classic.type == 200) return 'music-img'
        return 'other-img'
      },
    },
    data() {
      return {
        tagStyle: {
          width: '.72rem',
          height: '.4rem',
          marginLeft: '.2rem',
          marginTop: '-.02rem',
          backgroundColor: '#f7f7f7 !important',
        },
      }
    },
    methods: {
      onTap() {
        this.$emit('tapping', this.classic)
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .container
    display flex
    flex-direction column
    align-items center
    width 3.3rem
    background #fff
    .head
      display flex
      width 100%
      flex-direction row
      align-items center
      justify-content space-between
      height .8rem
      .like
        margin-top -.04rem
        // margin-right .2rem
    .other-img
      width 100%
      height 2.4rem
    .music-img
      border-radius 50%
      width 2.4rem
      height 2.4rem
    .text
      padding 0.3rem
      font-size .28rem
      height 1.3rem
      color #666
      overflow hidden
</style>
