<template>
  <div class="container">
    <div class="header">
      <Episode class="episode" v-if="classicData" :index="classicData.index" />
      <div class="like-container">
        <Like @like="onLike" :like="like" :count="count" />
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
  </div>
</template>

<script>
  import Episode from '../../classic/components/episode.vue'
  import Like from '@/components/like'
  import ImgBtn from '@/components/imgBtn'
  import Movie from '../../classic/components/movie'
  import Essay from '../../classic/components/essay'
  import Music from '../../classic/components/music'
  import { ClassicModel } from '@/api/classic'
  import { LikeModel } from '@/api/like'
  let classicModel = new ClassicModel()
  let likeModel = new LikeModel()
  export default {
    components: { Episode, Like, ImgBtn, Movie, Essay, Music },
    name: 'classic-detail',
    data() {
      return {
        classicData: null,
        latest: true,
        first: false,
        like: false,
        count: 0,
      }
    },

    methods: {
      getDetailInfo() {
        const { id, type } = this.$route.query
        classicModel.getById(id, type, (data) => {
          this.classicData = data
          this._getLikeStatus(data.id, data.type)
        })
      },
      onLike(e) {
        likeModel.like(e, this.classicData.id, this.classicData.type)
      },
      _getLikeStatus(cid, type) {
        likeModel.getClassicLikeStatus(cid, type, (data) => {
          this.like = data.like_status
          this.count = data.fav_nums
        })
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
</style>
