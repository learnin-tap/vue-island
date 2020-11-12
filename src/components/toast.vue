<template>
  <div>
    <div class="toast" v-if="showLoad">
      ???!
      <div class="toast-content">
        {{ content }}
        <!-- <slot name="content"></slot> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      timer: "", //定义定时器名称
      showLoad: false,
    };
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
      require: true,
    },
    duration: {
      type: Number,
      default: 2000,
    },
    content: {
      type: String,
      default: "",
    },
  },
  methods: {
    showToast() {
      console.log("toast组件", this.isShow);
      this.showLoad = this.isShow;
      console.log(this.showLoad, "加载函数");
      this.timer = setTimeout(() => {
        this.showLoad = false;
      }, this.duration);
    },
  },
  created() {
    this.showToast();
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
};
</script>

<style lang="stylus" scoped>
.toast
	display: flex;
	justify-content: center;
	align-items: center;
	.toast-content
		padding .2rem .35rem
		border-radius .05rem
		position: fixed;
		display flex
		justify-content: center;
		align-items: center;
		top: 40%
		background #515050
		z-index: 100;
		color #f5f5f5
</style>
