<template>
  <div>
    <div class="container">
      <div class="header">
        <Episode
          class="episode"
          v-if="classicData"
          :index="classicData.index"
        />
        <div class="like-container">
          <Like
            @like="onLike"
            :like="this.like_status"
            :count="this.like_count"
          />
          <ImgBtn class="share-btn">
            <template v-slot:img>
              <img class="share" src="@images/icon/share.png" alt="" />
            </template>
          </ImgBtn>
        </div>
      </div>

      <Movie
        v-if="classicData"
        :display="classicData.type == 100"
        :img="classicData.image"
        :content="classicData.content"
      />
      <Music
        v-if="classicData && classicData.type == 200"
        :img="classicData.image"
        :src="classicData.url"
        :title="classicData.title"
        :content="classicData.content"
      />
      <Essay
        v-if="classicData"
        :display="classicData.type == 300"
        :img="classicData.image"
        :content="classicData.content"
      />
      <Navi
        v-if="classicData"
        class="navi"
        :title="classicData.title"
        :first="first"
        :latest="latest"
        @left="onNext"
        @right="onPrevious"
      />
    </div>
  </div>
</template>

<script>
  import Like from '@/components/like'
  import ImgBtn from '@/components/imgBtn'
  import Episode from './components/episode'
  import Movie from './components/movie'
  import Music from './components/music'
  import Essay from './components/essay'
  import Navi from './components/navi'

  import { ClassicModel } from '@/api/classic'
  import { LikeModel } from '@/api/like'
  const classicModel = new ClassicModel()
  const likeModel = new LikeModel()

  export default {
    name: 'Classic',
    components: {
      Episode,
      Like,
      ImgBtn,
      Movie,
      Music,
      Essay,
      Navi,
    },
    data() {
      return {
        classicData: null,
        latest: true,
        first: false,
        // 点赞状态和点赞数据不写入缓存，单独调用接口
        like_status: false,
        like_count: 0,
      }
    },
    computed: {
      // real_img: function() {
      //   const imgUrl = this.classicData.image
      //   const imgName = imgUrl.slice(imgUrl.indexOf('images'))
      //   let val = `http://121.43.184.102:8886/static/${imgName}`
      //   return val
      // },
    },
    watch: {
      // likeCount(newVal, oldVal) {
      //   console.log(newVal, oldVal, 'LLL')
      //   this.likeCount = this.like_count
      // },
      // likeStatus() {
      //   this.likeStatus = this.like_status
      // },
    },
    created() {
      this.getLatest()
    },
    methods: {
      getLatest() {
        classicModel.getLatest((res) => {
          this.classicData = res
          this.like_count = res.fav_nums
          this.like_status = res.like_status
        })
      },
      onLike(e) {
        likeModel.like(e, this.classicData.id, this.classicData.type)
      },
      onNext() {
        this._updateClassic('next')
      },
      onPrevious() {
        this._updateClassic('previous')
      },
      _updateClassic(nextOrPrevious) {
        let index = this.classicData.index
        classicModel.getClassic(index, nextOrPrevious, (res) => {
          this._getLikeStatus(res.id, res.type)
          this.classicData = res
          this.latest = classicModel.isLatest(res.index)
          this.first = classicModel.isFirst(res.index)
        })
      },
      _getLikeStatus(artID, category) {
        likeModel.getClassicLikeStatus(artID, category, (res) => {
          this.like_count = res.fav_nums
          this.like_status = res.like_status
        })
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .container
    width 100%
    margin-top 1rem
    display flex
    flex-direction column
    align-items center
    .header
      width 100%
      height 1rem
      display flex
      flex-direction row
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
        // width 0.5rem
        flex-direction row
        justify-content space-between
        align-items center
        margin-right .3rem
        .share-btn
          margin-left .1rem
          .share
            width .4rem
            height .4rem
    .navi
      bottom 1.4rem
      position absolute
</style>
