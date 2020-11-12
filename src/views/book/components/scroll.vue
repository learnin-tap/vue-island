<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
export default {
  name: "scroll",
  props: {
    //设置为1则滚动的时候会派发scroll事件，会截流。是better-scroll的监听属性，设置快速滚动还是缓慢滚动
    probeType: {
      type: Number,
      default: 1,
    }, //是否点击事件
    click: {
      type: Boolean,
      default: true,
    },
    //需要传数据进来，因为当数据发生改变时，滚动条也需要refresh刷新，否则当数据改变时，不去刷新滚动条的话，可能就滚不动了
    dataArray: {
      type: Array,
      default: null,
    },
  },
  methods: {
    //初始化滚动条
    _initScroll() {
      //确保wrapper存在，因为执行_initScroll()时，如果this.$refs.wrapper为undefined就会报错
      if (!this.$refs.wrapper) return;
      //初始化scroll
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
      });
    },
    //如果scroll存在，就代理better-scroll的enable方法，启动better-scroll，默认开启
    enable() {
      this.scroll && this.scroll.enable();
    },
    //禁用better-scroll
    disable() {
      this.scroll && this.scroll.disable();
    },
    //刷新滚动条，重新计算高度
    refresh() {
      this.scroll && this.scroll.refresh();
    },
  },
  mounted() {
    //组件挂载时，调用滚动条，为了确保DOM渲染了，需要一个定时器，20毫秒再调用
    setTimeout(() => {
      // console.log("BetterScroll：加载开始");
      this._initScroll();
      // console.log("BetterScroll：加载完毕");
    }, 20);
  },
  // 监听数据变化 重新载入Bs
  watch: {
    dataArray() {
      setTimeout(() => {
        this.refresh();
      }, 20);
      console.log("BetterScroll：重载");
    },
  },
};
</script>

<style lang="stylus" scoped></style>
