<template>
  <div>
    <div class="container" v-if="!searching">
      <div class="header">
        <div class="box" @click="onSearching">
          <img class="box-img" src="@images/icon/search.png" />
          <span>搜索书籍</span>
        </div>
      </div>
      <div class="sub-container">
        <img
          ref="container"
          src="@images/book/quality.png"
          alt=""
          class="head-img"
        />
        <div class="books-container" ref="inner">
          <div v-for="item of books" :key="item.id">
            <BookItem class="book-item" :book="item" />
          </div>
        </div>
      </div>
    </div>
    <Searching v-if="searching" @cancel="onCancel" :more="more" />
  </div>
</template>

<script>
  import { BookModel } from '@/api/book'
  import BookItem from './components/book-item'
  import Searching from './components/search'
  import { random } from '@utils/common'
  const bookModel = new BookModel()
  let timer = null // 不作为响应式变量，提升性能
  export default {
    name: 'Book',
    components: {
      BookItem,
      Searching,
    },
    data() {
      return {
        books: [],
        searching: false,
        more: '',
      }
    },
    mounted() {
      window.addEventListener('scroll', this.initScroll)
    },
    // 单页应用，需要销毁监听滚动，否则会出现错乱
    deactivated() {
      window.removeEventListener('scroll', this.initScroll)
    },
    methods: {
      initScroll() {
        this.throttle()
      },
      throttle() {
        if (timer) {
          clearTimeout(timer)
          timer = null
        }
        timer = setTimeout(() => {
          this.reachBottom()
        }, 500)
      },
      reachBottom() {
        //变量scrollTop是滚动条滚动时，距离顶部的距离,即滚动条高度
        let scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop
        //变量windowHeight是可视区的高度
        let windowHeight =
          document.documentElement.clientHeight || document.body.clientHeight
        //变量scrollHeight是滚动条的总高度
        let scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight
        if (scrollTop + windowHeight >= scrollHeight - 125) {
          this.more = random(16) //每次触底传入变化的值使搜索组件监听加载
        }
      },
      getHotList() {
        bookModel.getHotList().then((res) => {
          this.books = res
        })
      },
      onSearching() {
        this.searching = true
      },
      onCancel() {
        this.searching = false
      },
    },
    created() {
      this.getHotList()
    },
  }
</script>

<style lang="stylus" scoped>
  .container
    display flex
    flex-direction column
    align-items center
    width 100%
    margin-top 1rem
    .header
      position fixed
      background #fff
      height 1rem
      width 100%
      border-top .02rem solid #f5f5f5
      border-bottom .02rem solid #f5f5f5
      display flex
      flex-direction row
      align-items center
      justify-content center
      box-shadow 0 0 .03rem 0 #e3e3e3
      z-index 99
      .box
        display flex
        flex-direction row
        justify-content center
        align-items center
        border-radius .5rem
        background #f5f5f5
        height .68rem
        width 7rem
        color #999
        .box-img
          margin-right .2rem
          width .28rem
          height .28rem
          margin-bottom -.04rem
    .sub-container
      display flex
      flex-direction column
      align-items center
      background #f5f5f5
      margin-top 1rem
      margin-bottom 1rem
      .head-img
        width 1.06rem
        height .34rem
        margin-top .4rem
      .books-container
        margin-top .1rem
        display flex
        flex-wrap wrap
        justify-content space-between
        padding 0 0.9rem
        overflow-y scroll
        height 100%
        // background green
        // width 100%
        // position: relative
        // overflow hidden
        // width: 100%
        // overflow: hidden
        .book-item
          margin-bottom .1rem
</style>
