<template>
  <div>
    <div class="container">
      <audio
        ref="player"
        :src="src"
        loop="true"
        @play="play"
        @pause="pause"
        preload="true"
      ></audio>
      <img :src="img" class="classic-img" :class="toggleRotation" alt="" />
      <img
        :src="!playing ? playSrc : pauseSrc"
        class="player-img"
        @click="onPlay"
        alt=""
      />
      <img src="./images/music@tag.png" class="tag" alt="" />
      <span class="content">{{ content }}</span>
    </div>
  </div>
</template>

<script>
  import { classicBeh } from '@utils/mixin'
  export default {
    name: 'misic',
    mixins: [classicBeh],
    props: {
      src: String,
      title: String,
    },
    data() {
      return {
        playing: false,
        pauseSrc: require('./images/player@pause.png'),
        playSrc: require('./images/player@play.png'),
      }
    },
    computed: {
      toggleRotation() {
        return this.playing == true ? 'rotation' : ''
      },
    },
    methods: {
      onPlay() {
        // 图片切换
        this.playing = !this.playing
        let player = this.$refs.player
        if (this.playing) {
          player.play()
        } else {
          player.pause()
        }
      },

      play() {
        // 监听 video 原生 api 播放
        this.playing = true
      },

      pause() {
        // 监听 video 原生 api 暂停
        this.playing = false
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .container
    display flex
    flex-direction column
    align-items center
    .classic-img
      width: 4.22rem
      height: 4.22rem
      margin-top: .4rem
      border-radius: 50%
    .player-img
      width: 1.2rem
      height: 1.2rem
      position: relative
      bottom: 2.7rem
    .rotation
      transform rotate(360deg)
      animation rotation 12s linear infinite
      @keyframes rotation
        from
          transform rotate(0deg)
        to
          transform rotate(360deg)
    .tag
      width .44rem
      height 1.28rem
      position relative
      bottom 1.6rem
      right 3.0rem
    .content
      display block
      /* width:275px; */
      // max-width 5.5rem
      font-size 0.36rem
      margin-top -1.3rem
</style>
