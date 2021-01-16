<template>
  <div>
    <div class="container">
      <div class="header">
        <div class="search-container">
          <img src="./images/search.png" class="icon" alt="" />
          <input
            ref="inputId"
            v-model="q"
            @keyup.enter="onChange"
            placeholder="书籍名"
            class="bar"
          />
          <img
            src="./images/cancel.png"
            @click="onDelete"
            class="cancel-img"
            alt=""
          />
        </div>
        <div class="cancel" @click="onCancel">取消</div>
      </div>
      <div v-show="!searching">
        <div class="history">
          <div class="title">
            <div class="chunk"></div>
            <span>历史搜索</span>
          </div>
          <div class="tags">
            <div v-for="(item, index) of historyWords" :key="index">
              <Tag class="tag-item" :text="item" @tapping="onConfirm" />
            </div>
          </div>
        </div>
        <div class="history hot-search">
          <div class="title">
            <div class="chunk"></div>
            <span>热门搜索</span>
          </div>
          <div class="tags">
            <div v-for="(item, index) of hotWords" :key="index">
              <Tag class="tag-item" @tapping="onConfirm" :text="item" />
            </div>
          </div>
        </div>
      </div>
      <div class="books-container" v-show="searching">
        <div v-for="item of dataArray" :key="item.id">
          <BookItem :book="item" class="book-item" />
        </div>
      </div>
      <Loading class="loading-center" v-if="loadingCenter" />
      <Loading class="loading" v-if="loading" />
      <span class="empty-tip" v-if="noneResult">没有搜索到书籍</span>
    </div>
  </div>
</template>
<script>
  import { pagination } from '@/utils/mixin.js'
  import Tag from '@/components/tag.vue'
  import Loading from '@/components/loading.vue'
  import BookItem from '../components/book-item'
  import { BookModel } from '@/api/book'
  import { KeywordModel } from '@/api/keyword'
  const bookModel = new BookModel()
  const keywordModel = new KeywordModel()
  export default {
    name: 'search',
    components: {
      Tag,
      Loading,
      BookItem,
    },
    mixins: [pagination],
    props: {
      more: String,
    },
    data() {
      return {
        historyWords: [],
        hotWords: [],
        searching: false,
        q: '',
        loadingCenter: false,
      }
    },
    methods: {
      // 加载更多
      loadMore() {
        // 用户无输出就返回
        if (!this.q) return
        //处于上锁状态则返回,此时正在请求更多数据
        if (this.isLocked()) return
        // 还有数据没请求完，可以继续进行请求
        if (this.hasMore()) {
          this.locked() //请求数据的时候上锁
          bookModel.search(this.getCurrentStart(), this.q).then(
            (res) => {
              this.setMoreData(res.books)
              this.unLocked()
            },
            () => {
              // 调用失败时解锁，比如断网不能加载数据，恢复网络时再请求数据
              this.unLocked()
            }
          )
        }
      },
      // 点击取消搜索
      onCancel() {
        this.initialize() //初始化状态
        this.$emit('cancel')
      },
      // 清空输入内容
      onDelete() {
        this.initialize()
        this.changeFocus() //清空输入内容时也保持input聚焦
        this._closeResult()
      },
      // input失去焦点触发
      onChange() {
        // 无搜索关键字直接return
        const val = this.q.trim()
        if (!val) return
        this._showResult()
        this._ShowLoadingCenter()
        this.initialize()
        bookModel.search(0, val).then((res) => {
          this.setMoreData(res.books)
          keywordModel.addToHistory(val)
          this.setTotal(res.total)
          this._hideLoadingCenter()
        })
      },
      // 点击关键字进行搜索并将关键字填充搜索框
      onConfirm(e) {
        this._showResult()
        this._ShowLoadingCenter()
        this.initialize()
        this.q = e
        bookModel.search(0, this.q).then((res) => {
          this.setMoreData(res.books)
          this.setTotal(res.total)
          keywordModel.addToHistory(this.q)
          this._hideLoadingCenter()
        })
      },
      // 获取接口数据
      initApiData() {
        this.historyWords = keywordModel.getHistory()
        keywordModel.getHot().then((res) => {
          this.hotWords = res.hot
        })
      },
      // input输入框自动聚焦
      changeFocus() {
        this.$nextTick(() => {
          this.$refs.inputId.focus()
        })
      },
      // 显示正在搜索icon状态
      _ShowLoadingCenter() {
        this.loadingCenter = true
      },
      // 关闭正在搜索的icon状态
      _hideLoadingCenter() {
        this.loadingCenter = false
      },
      // 处于搜索状态
      _showResult() {
        this.searching = true
      },
      // 关闭搜索状态
      _closeResult() {
        this.searching = false
        this.q = ''
      },
    },
    watch: {
      more: function() {
        // console.log('变了', val, oldVal)
        this.loadMore()
      },
    },
    created() {
      this.initApiData()
      this.changeFocus()
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
    margin-bottom 1rem
    .header
      position fixed
      height 1rem
      border-top .02rem solid #f5f5f5
      border-bottom .02rem solid #f5f5f5
      display flex
      flex-direction row
      width 7.5rem
      align-items center
      z-index 98
      background #fff
      .search-container
        display inline-flex
        flex-direction row
        align-items center
        background #f5f5f5
        border-radius 1rem
        margin-left .2rem
        .icon
          width .28rem
          height .28rem
          margin-left .24rem
          margin-right .16rem
        .bar
          border-top-right-radius .3rem
          border-bottom-right-radius .3rem
          display inline-block
          height .68rem
          width 5rem
          font-size .28rem
          background #f5f5f5
        input::-webkit-input-placeholder
          color: #999
        .cancel-img
          width .28rem
          height .28rem
          margin-right .2rem
      .cancel
        line-height .68rem
        width 1.2rem
        text-align center
        display inline-block
        border none
    .history
      width 6.9rem
      margin .4rem	0 .2rem 0
      display flex
      font-size .28rem
      margin-top 1.6rem
      flex-direction column
      .title
        line-height .3rem
        display flex
        flex-direction row
        align-items center
        .chunk
          width .1rem
          height .3rem
          background #000
          display inline-block
          margin-right .2rem
      .tags
        display flex
        flex-direction row
        flex-wrap wrap
        margin-top .24rem
        padding-left .3rem
        width 6.3rem
        .tag-item
          margin-right .2rem
          margin-bottom .2rem
    .hot-search
      margin-top .7rem
    .books-container
      width 5.7rem
      margin-top 1rem
      margin-bottom 1rem
      display flex
      flex-wrap wrap
      padding 0 .9rem
      justify-content space-between
      .book-item
        margin-bottom .1rem
    .loading
      margin .5rem 0 .5rem 0
    .loading-center
      position absolute
      top 50%
      left 50%
    .empty-tip
      direction i-inline-block
      width 100%
      text-align center
      position absolute
      top 50%
</style>
