<template>
  <div>
    <div class="container" v-if="!searching">
      <div class="header">
        <div class="box" @click="onSearching">
          <img class="box-img" src="@images/icon/search.png" />
          <span>搜索书籍</span>
        </div>
      </div>

      <Scroll
        v-if="books.length"
        ref="bookList"
        class="scroll-wrapper"
        :dataArray="books"
      >
        <div style="background:yellow">
          <div class="sub-container">
            <img src="@images/book/quality.png" alt="" class="head-img" />
            <div class="books-container">
              <div v-for="item of books" :key="item.id">
                <BookItem class="book-item" :book="item" />
              </div>
            </div>
          </div>
        </div>
      </Scroll>
      <!-- <button @click="openTop()">top</button>
      <button @click="openCenter()">center</button>
      <button @click="openBottom()">bottom</button>
      <button @click="openLoading()">loading</button> -->
    </div>

    <Searching v-if="searching" @cancel="onCancel" :more="more" />
  </div>
</template>

<script>
import { BookModel } from "@/api/book";
import BookItem from "./components/book-item";
import Searching from "./components/search";
import Scroll from "./components/scroll";
const bookModel = new BookModel();
export default {
  name: "Book",
  components: {
    BookItem,
    Searching,
    Scroll,
  },
  data() {
    return {
      books: [],
      searching: false,
      more: "",
    };
  },
  methods: {
    // openTop() {
    //   this.$toast.top("top");
    // },
    // openCenter() {
    //   this.$toast.center("center");
    // },
    // openBottom() {
    //   this.$toast("bottom"); // or this.$toast.bottom('bottom');
    // },
    // openLoading() {
    //   this.$loading("loading...");
    //   let self = this;
    //   setTimeout(function() {
    //     self.closeLoading();
    //   }, 2000);
    // },
    // closeLoading() {
    //   this.$loading.close();
    // },
    getHotList() {
      bookModel.getHotList().then((res) => {
        res = res.msg;
        this.books = res;
      });
    },
    onSearching() {
      this.searching = true;
    },
    onCancel() {
      this.searching = false;
    },
    onReachBottom() {
      console.log("到底了");
    },
  },
  created() {
    this.getHotList();
  },
};
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
// .scroll-wrapper
// 	background #f5f5f5
// 	height 15rem
// 	// position relative
// 	overflow hidden
	.sub-container
		display flex
		flex-direction column
		align-items center
		background #f5f5f5
		margin-top 1rem
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
			background green
				// width 100%
				// position: relative
				// overflow hidden
        // width: 100%
        // overflow: hidden
			.book-item
				margin-bottom .1rem
</style>
