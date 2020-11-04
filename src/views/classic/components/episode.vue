<template>
  <div>
    <div class="container">
      <div class="index-container">
        <span class="plain">No.</span>
        <span class="index">{{ real_index }}</span>
        <div class="line"></div>
      </div>
      <div class="date-container">
        <span class="month">{{ month }}</span>
        <span class="year">{{ year }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "episode",
  props: {
    index: Number,
  },
  data() {
    return {
      months: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ],
      year: 0,
      month: "",
    };
  },
  mounted() {
    let date = new Date();
    this.year = date.getFullYear();
    this.month = this.months[date.getMonth()]; //this.month是时间月份，字符串
  },
  computed: {
    real_index: function() {
      let val = this.index < 10 ? "0" + this.index : this.index;
      return val;
    },
  },
};
</script>

<style lang="stylus" scoped>
.container
	height 0.6rem
	display inline-flex
	flex-direction row
	.index-container
		display flex
		flex-direction row
		align-items baseline
		.plain
			font-size .32rem
		.index
			font-size .6rem
			line-height .6rem
			font-weight 600
			margin-right .14rem
		.line
			height .44rem
			margin-right .14rem
			border-left .03rem solid black
	.date-container
		display flex
		flex-direction column
		margin-top .06rem
		.month
			font-size .24rem
			line-height .24rem
		.year
			font-size .2rem
</style>
