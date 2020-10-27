<template>
  <div>
    <Header />
    <div class="container">
      <div class="header">
        <Episode class="episode" :index="this.index" />
        <div class="like-container">
          <Like
            class="like"
            @like="onLike"
            :like="this.likeStatus"
            :count="this.likeCount"
          />
          <ImgBtn class="share-btn">
            <template v-slot:img>
              <img class="share" src="@images/icon/share.png" alt="" />
            </template>
          </ImgBtn>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/_header";
import Footer from "@/components/_footer";
import Episode from "./components/episode";
import Like from "./components/like";
import ImgBtn from "./components/imgBtn";
import { ClassicModel } from "@/api/classic";
import { LikeModel } from "@/api/like";
const classicModel = new ClassicModel();
const likeModel = new LikeModel();

export default {
  name: "Classic",
  components: {
    Header,
    Footer,
    Episode,
    Like,
    ImgBtn,
  },
  data() {
    return {
      classicData: null,
      index: 0,
      latest: true,
      first: false,
      // 点赞状态和点赞数据不写入缓存，单独调用接口
      likeCount: 0,
      likeStatus: false,
    };
  },
  created() {
    this.getLatest();
  },
  methods: {
    onLike(e) {
      likeModel.like(e, this.classicData.id, this.classicData.type);
    },
    getLatest() {
      classicModel.getLatest((res) => {
        res = res.msg;
        this.classicData = res;
        this.index = res.index;
        this.likeCount = res.fav_nums;
        this.likeStatus = Boolean(res.like_status);
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.container
	width 100%
	// display flex
	// flex-direction column
	// align-items center
	.header
		display flex
		flex-direction row
		width 100%
		height 1rem
		align-items center
		justify-content space-between
		border-top .02rem solid #f5f5f5
		border-bottom .02rem solid #f5f5f5
		.episode
			margin-left .2rem
			margin-top .04rem
		.like-container
			display flex
			// width 100rpx
			// width 1rem
			flex-direction row
			justify-content space-between
			align-items center
			margin-right .3rem
			.like
				margin-top .06rem
			.share-btn
				margin-top .06rem
				margin-left .1rem
				.share
					width .4rem
					height .4rem
</style>
