<template>
  <div class="dialog">
    <!--外层的遮罩 点击事件用来关闭弹窗，isShow控制弹窗显示 隐藏的props-->
    <div class="dialog-cover" v-if="isShow" @click="closeMyself"></div>
    <transition name="drop">
      <div
        v-if="isShow"
        class="dialog-content"
        :style="{
          top: topDistance + '%',
          width: widNum + '%',
          left: leftSite + '%',
        }"
      >
        <div class="dialog_head">
          <!--弹窗头部 title-->
          <slot
            name="header"
            :style="{ paddingTop: pdt + 'px', paddingBottom: pdb + 'px' }"
            >提示信息</slot
          >
        </div>
        <div
          class="dialog_main"
          :style="{ paddingTop: pdt + 'px', paddingBottom: pdb + 'px' }"
        >
          <!--弹窗的内容-->
          <slot name="main">弹窗内容</slot>
        </div>
        <!--弹窗关闭按钮-->
        <div class="foot_close" @click="closeMyself">
          <div class="close_img"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    isShow: {
      type: Boolean,
      default: false,
      require: true,
    },
    widNum: {
      type: Number,
      default: 86.5,
    },
    // 左定位
    leftSite: {
      type: Number,
      default: 6.5,
    },
    //top上边距
    topDistance: {
      type: Number,
      default: 35,
    },
    //上padding
    pdt: {
      type: Number,
      default: 22,
    },
    //下padding
    pdb: {
      type: Number,
      default: 47,
    },
  },
  methods: {
    closeMyself() {
      //如果需要传参的话，可以在"on-close"后面再加参数，然后在父组件的函数里接收就可以了。
      this.$emit("on-close");
    },
  },
};
</script>

<style lang="stylus" scoped>
/** 弹窗动画*/
.drop-enter-active
  // 动画进入过程：0.5s
  transition: all 0.5s ease;
.drop-leave-active
  // 动画离开过程：0.5s
  transition: all 0.3s ease;
.drop-enter
  //动画之前的位置
  transform: translateY(-500px);
.drop-leave-active
  //动画之后的位置
  transform: translateY(-500px);
// 最外层 设置position定位
.dialog
  position: relative;
  // color: #2e2c2d;
	color red
  font-size: 16px;
	// 遮罩 设置背景层，z-index值要足够大确保能覆盖，高度 宽度设置满 做到全屏遮罩
	.dialog-cover
		background: rgba(0, 0, 0, 0.8);
		position: fixed;
		z-index: 99;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	// 内容层 z-index要比遮罩大，否则会被遮盖，
	.dialog-content
		position: fixed;
		top: 35%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 100;
		.dialog_head
			// 头部title的背景 居中圆角等属性。
			// 没有图片就把background-image注释掉
			background-image: url("./images/dialog_head.png");
			width: 86.5%;
			height: .86rem;
			display: flex;
			justify-content: center;
			align-items: center;
			border-top-left-radius: .2rem;
			border-top-right-radius: .2rem;
			background: #fff;
		.dialog_main
			// 主体内容样式设置
			background: #fff;
			display: flex;
			justify-content: center;
			align-content: center;
			width: 86.5%;
			padding: .44rem 0 .94rem 0;
			border-bottom-left-radius: .2rem;
			border-bottom-right-radius: .2rem;
		.foot_close
			width: 1rem;
			height: 1rem;
			border-radius: 50%;
			background: #fcca03;
			display: flex;
			justify-content: center;
			align-content: center;
			margin-top: -.5rem;
			.close_img
				background-image: url("./images/dialog_close.png");
				width: .84rem;
				height: .84rem;
</style>
