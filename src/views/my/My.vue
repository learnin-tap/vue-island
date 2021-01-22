<template>
  <div class="container">
    <img src="@images/my/my@bg.png" class="bg" alt="" />
    <img-btn class="avatar-position">
      <img slot="img" src="@images/my/my.png" class="avatar" alt="" />
    </img-btn>
    <div
      v-if="authorized"
      @click="onTap"
      class="avatar-container avatar-position"
    >
      <img class="avatar" src="@images/my/my.png" alt="" />
      <span class="nickName">Gary</span>
    </div>
    <div class="about-container">
      <div class="about-us" @click="onTap">
        <img class="about-img" src="@images/my/about.png" alt="" />
        <span class="description">关于我们</span>
      </div>
      <div class="about-us">
        <span class="book-num">{{ bookCount }}</span>
        <span class="description">喜欢的书</span>
      </div>
    </div>

    <div class="like-container">
      <img src="@images/my/like.png" alt="" class="headline" />
      <div class="preview-container">
        <div v-for="(item, index) of classics" :key="index">
          <Preview :classic="item" @tapping="onJumpToDetail" class="preview" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ImgBtn from '@/components/imgBtn'
  import Preview from './components/preview'
  import { ClassicModel } from '@/api/classic'
  import { BookModel } from '@/api/book'
  const classicModel = new ClassicModel()
  const bookModel = new BookModel()
  export default {
    name: 'My',
    components: {
      ImgBtn,
      Preview,
    },
    data() {
      return {
        authorized: false, //是否授权
        userInfo: null, //用户信息
        bookCount: 0, //书籍数量
        classics: null,
      }
    },
    created() {
      this.getMyFavor()
      this.hasGottenUserInfo()
      this.getMyBookCount()
    },
    methods: {
      getMyFavor() {
        classicModel.getMyFavor((data) => {
          this.classics = data
        })
      },
      hasGottenUserInfo() {
        this.authorized = true
        this.userInfo = {}
      },
      getMyBookCount() {
        bookModel.getBookCount().then((data) => {
          this.bookCount = data.count
        })
      },
      onJumpToDetail(e) {
        const { id, type } = e
        this.$router.push({
          name: `ClassicDetail`,
          query: {
            id,
            type,
          },
        })
      },
      onTap() {
        alert('继续开发中~')
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .container
    display flex
    flex-direction column
    align-items center
    .bg
      width 100%
      height 5.74rem
    .avatar-position
      position absolute
      top 2.55rem
      .avatar
        width 1.2rem
        height 1.2rem
        overflow hidden
        border-radius 50%
      .nickName
        margin-bottom .1rem
        font-size .32rem
    .avatar-container
      display flex
      flex-direction column
      align-items center
    .about-container
      width 75%
      display flex
      flex-direction row
      justify-content space-between
      position absolute
      top 4.4rem
      .about-us
        display flex
        flex-direction column
        align-items center
        justify-content space-between
        .about-img
          width .34rem
          height .34rem
        .description
          font-size .24rem
          color #999
          line-height .4rem
        .book-num
          font-size .36rem
          color #000
    .like-container
      margin-top -.13rem
      margin-bottom 1rem
      display flex
      flex-direction column
      align-items center
      background #f5f5f5
      .headline
        margin-top .3rem
        width .97rem
        height .42rem
      .preview-container
        margin-top .3rem
        width 95%
        display flex
        flex-direction row
        flex-wrap wrap
        justify-content space-between
        .preview
          margin-bottom .3rem
</style>
