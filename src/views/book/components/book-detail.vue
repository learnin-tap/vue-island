<template>
  <div>
    <div class="container">
      <div class="head" v-if="book">
        <img :src="book.image" alt="" />
        <span class="title">{{ book.title }}</span>
        <span class="author">{{ book.author[0] }}</span>
      </div>
      <div class="sub-container">
        <span class="headline">短评</span>
        <div class="comment-container" v-if="comments == true">
          <div
            v-for="(item, index) in lengthLimit(comments.comments, 5)"
            :key="index"
          >
            <Tag class="tag" :text="item.content" :tagClass="judgeAttr(index)">
              <span class="num" slot="after">+{{ item.nums }}</span>
            </Tag>
          </div>
        </div>
        <div class="comment-container" v-else>还没有短评</div>
      </div>
      <div class="sub-container">
        <span class="headline">内容简介</span>
        <span class="content" v-if="book">
          {{ book.summary | format(book.summary) }}
        </span>
      </div>
      <div class="sub-container">
        <span class="headline">书本信息</span>
        <div class="detail-container">
          <div class="vertical description">
            <span>出版社</span>
            <span>出版年</span>
            <span>页数</span>
            <span>定价</span>
            <span>装帧</span>
          </div>
          <div class="vertical" v-if="book">
            <span>{{ book.publisher }}</span>
            <span>{{ book.pubdate }}</span>
            <span>{{ book.pages }}</span>
            <span>{{ book.price }}</span>
            <span>{{ book.binding }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="post-container" v-show="!posting">
      <div class="post-fake" @click="onFakePost">
        <span>输入短评</span>
      </div>
      <div class="like-container">
        <Like @like="onLike" :like="likeStatus" :count="likeCount" />
        <ImgBtn>
          <template v-slot:img>
            <img class="share" src="@images/icon/share.png" alt="" />
          </template>
        </ImgBtn>
      </div>
    </div>

    <div class="posting-container" v-if="posting">
      <div class="post-header">
        <span v-if="comments == true">可点击标签+1</span>
        <span v-else>暂无短评</span>
        <span class="cancel" @click="onCancel">取消</span>
      </div>
      <div class="comment-container" v-if="comments.comments">
        <span
          v-for="(item, index) in lengthLimit(comments.comments, 3)"
          :key="index"
        >
          <Tag
            class="tag"
            @tapping="onPost"
            :text="item.content"
            :tagClass="judgeAttr(index)"
          >
            <span class="num" slot="after">+{{ item.nums }}</span>
          </Tag>
        </span>
      </div>
      <input
        class="post"
        v-model="val"
        @keyup.enter="onPost"
        placeholder="短评最多12个字"
      />
    </div>
    <Shadow v-if="posting" />
    <!-- <Dialog class="loading-center" :isShow="true" @on-close="closeDialog">
      <div slot="header">插入到name为header的slot标签里面</div>
      <div class="dialog_publish_main" slot="main">
        这里是内容插入到子组件的slot的name为main里面，可以在父组件中添加class定义样式，事件类型等各种操作
      </div>
    </Dialog> -->
    <!-- v-if="this.toast.isShow"
      :isShow="this.toast.isShow"
      :duration="this.toast.duration" -->
    <!-- <Toast
      v-if="toastShow"
      :isShow="toastShow"
      :duration="toast.duration"
      :content="toast.content"
    > -->
    <!-- <template v-slot:content>???????</template> -->
    <!-- <div slot="content">?{{ this.toast.content }}</div> -->
    <!-- </Toast> -->
    <Loading class="loading-center" v-if="loadingCenter" />
  </div>
</template>

<script>
  import Loading from '@/components/loading'
  import Tag from '@/components/tag'
  import Like from '@/components/like'
  import ImgBtn from '@/components/imgBtn'
  import Shadow from '@/components/shadow'
  // import Dialog from "@/components/dialog";
  // import Toast from "@/components/toast";
  import { BookModel } from '@/api/book'
  import { LikeModel } from '@/api/like'
  const bookModel = new BookModel()
  const likeModel = new LikeModel()
  export default {
    name: 'book-detail',
    components: {
      Loading,
      Tag,
      Like,
      ImgBtn,
      Shadow,
      // Dialog,
      // Toast,
    },
    data() {
      return {
        comments: [], //短评
        book: null, //书籍信息
        likeStatus: false,
        likeCount: 0,
        val: '', //用户输入短评内容
        // toast: {},
        // toastShow: false, //控制toast状态
        posting: false, //是否进行短评的页面状态控制
        loadingCenter: true, //控制进入时loading状态
      }
    },
    methods: {
      // 获取书籍相关信息
      getDetailInfo() {
        const bid = this.$route.params.id
        // const isbn = this.$route.params.isbn;
        // const bid = 6021440
        // const isbn = 9787115249494
        const detail = bookModel.getDetail(bid)
        const comments = bookModel.getComments(bid)
        const likeStatus = bookModel.getLikeStatus(bid)
        Promise.all([detail, comments, likeStatus]).then((res) => {
          this.book = res[0]
          this.comments = res[1]
          this.likeStatus = Boolean(res[2].like_status)
          this.likeCount = res[2].fav_nums
          this.loadingCenter = false
        })
      },
      onLike(e) {
        likeModel.like(e, this.book.id, 400)
      },
      // 控制短评数量
      lengthLimit(list, length) {
        return list.slice(0, length)
      },
      // 根据index传入不同样式
      judgeAttr(index) {
        if (index == 0) return 'background-color: #fffbdd !important'
        if (index == 1) return 'background-color: #eefbff !important'
        return ''
      },
      // 发送短评
      onPost(e) {
        const val = this.val.trim() || e
        if (!val || typeof val == 'object') return // 无短评内容直接返回,当val==object说明输入的是空值
        // 超过12个字的短评直接return
        if (val.length > 12) {
          this.$toast.center('短评最多12个字') //toast提示
          return
        }
        bookModel.postComments(this.book.id, val).then(() => {
          this.$toast.center('+1') //toast提示
          this.comments.comments.unshift({
            content: val,
            nums: 1,
          })
          this.val = ''
          this.posting = false
        })
      },
      // 进行短评页面状态
      onFakePost() {
        this.posting = true
      },
      // 取消进行短评页面状态
      onCancel() {
        this.posting = false
      },
    },
    created() {
      this.getDetailInfo()
    },
  }
</script>

<style lang="stylus" scoped>
  .container
    width 100%
    background #f5f5f5
    margin-top 1rem
    .head
      background #fff
      padding-top .4rem
      padding-bottom .4rem
      display flex
      flex-direction column
      align-items center
      & img
        width 2rem
        height 3rem
        box-shadow .04rem .04rem .06rem #e3e3e3
      .title
        color: #2f2f2f
        margin-top .2rem
        font-size .38rem
        font-weight 600
      .author
        margin-top .1rem
        font-size .28rem
        color #999
    .sub-container
      display flex
      flex-direction column
      align-items center
      margin-top .3rem
      background #fff
      padding .3rem
      .headline
        font-size .3rem
        font-weight 600
        color #2f2f2f
        margin-bottom .2rem
      .comment-container
        display flex
        flex-direction row
        flex-wrap wrap
        .tag
          margin-right .15rem
          margin-bottom .1rem
          .num
            margin-left .1rem
            font-size .22rem
            color #aaa
      .content
        text-indent 2em
        font-weight 500
        white-space pre-wrap
        line-height .35rem
      .detail-container
        width 100%
        display flex
        flex-direction row
        justify-content flex-start
        margin-bottom 2rem
        font-size .28rem
        color #666
        .vertical
          display flex
          flex-direction column
          line-height .35rem
        .description
          color #999
          margin-right .3rem
  .post-container
    height 1rem
    box-shadow .02rem -.02rem .02rem #e3e3e3
    position fixed
    width 100%
    background #fff
    bottom 1rem
    display flex
    flex-direction row
    align-items center
    justify-content space-around
    .post-fake
      display flex
      flex-direction row
      align-items center
      height .6rem
      width 4.6rem
      border .02rem solid #999
      border-radius .3rem
      font-size .22rem
      padding-left .2rem
    .like-container
      display flex
      flex-direction row
      justify-content center
      align-items center
      .share
        width .4rem
        height .4rem
  .posting-container
    bottom 1rem
    position fixed
    display flex
    flex-direction column
    align-items center
    background #fff
    width 100%
    z-index 999
    .post-header
      width 100%
      height 1rem
      border-top .02rem solid #f5f5f5
      border-bottom .02rem solid #f5f5f5
      display flex
      flex-direction row
      align-items center
      justify-content space-between
      & span
        padding .25rem
      & span:first-child
        font-size .28rem
        color #bbb
      .cancel
        color #666
    .comment-container
      width 100%
      padding .4rem .3rem 0 .5rem
      .tag
        margin-right .15rem
        margin-bottom .1rem
        display inline-flex
        .num
          margin-left .1rem
          font-size .22rem
          color #aaa
    .post
      width 100%
      height .56rem
      margin 0.3rem auto
      background #f5f5f5
      border-radius .3rem
      padding-left .25rem
  .loading-center
    position absolute
    top 50%
    left 50%
</style>
