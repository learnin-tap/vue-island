<template>
  <div>
    <!-- router-link默认是a标签的样式，打上tag为div标签 -->
    <!-- <router-link tag="div" class="container" :to="'/book-detail/' + book.id"> -->
    <div class="container" @click="onTap">
      <img class="cover-img" :src="book.image" alt="" />
      <div class="description">
        <span class="title">{{ book.title }}</span>
        <span class="author">{{ author }}</span>
        <div class="foot">
          <span class="footer">{{ book.fav_nums }} 喜欢</span>
        </div>
      </div>
    </div>
    <!-- </router-link> -->
  </div>
</template>

<script>
  export default {
    name: 'BookItem',
    props: {
      book: Object,
    },
    computed: {
      author() {
        // author数据：热门图书返回字符串，搜索返回的是数组，需要作如下处理
        if (typeof this.book.author == 'string') {
          return this.book.author
        } else {
          return this.book.author[0]
        }
      },
    },
    methods: {
      onTap() {
        const id = this.book.id
        this.$router.push({
          name: `BookDetail`,
          params: {
            id,
          },
        })
      },
    },
  }
</script>
<style lang="stylus" scoped>
  .container
    margin-top .3rem
    display flex
    position relative
    box-shadow .02rem .02rem .03rem #e3e3e3
    flex-direction column
    width 2.4rem
    height 3.6rem
    .cover-img
      width 100%
      height 100%
      border-radius .04rem
    .description
      width 2.16rem
      position absolute
      bottom 0
      background #fff
      padding .05rem .1rem .08rem .15rem
      font-size .24rem
      display flex
      flex-direction column
      border-bottom-right-radius .04rem
      border-bottom-left-radius .04rem
      .title
        padding-top .05rem
        text-overflow ellipsis
        white-space nowrap
        overflow hidden
      .author
        font-size .2rem
        color #999
        padding-top .05rem
        margin-bottom .1rem
        text-overflow: ellipsis
        white-space: nowrap
        overflow: hidden
      .foot
        font-size .2rem
        display flex
        flex-direction row
        justify-content flex-end
        .footer
         color #666
</style>
