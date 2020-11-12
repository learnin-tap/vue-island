<template>
  <div>
    <div class="tab-container">
      <div
        v-for="item of tabList"
        :key="item.id"
        @click.stop="tabClick(item.id)"
      >
        <div class="tab-item">
          <img
            v-if="selected === item.id"
            class="item-img"
            :src="item.selected"
          />
          <img v-else class="item-img" :src="item.icon" />

          <span
            v-if="selected === item.id"
            :style="selectedColor"
            class="item-txt"
            >{{ item.name }}</span
          >
          <span v-else class="item-txt">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Classic from "@images/tab/classic.png";
import Classic_Selected from "@images/tab/classic@highlight.png";
import Book from "@images/tab/book.png";
import Book_Selected from "@images/tab/book@highlight.png";
import My from "@images/tab/my.png";
import My_Selected from "@images/tab/my@highlight.png";
export default {
  name: "Footer",
  data() {
    return {
      selected: "",
      selectedColor: {
        color: "#000000",
      },
      tabList: [
        {
          id: "classic",
          name: "流行",
          icon: Classic,
          selected: Classic_Selected,
        },
        {
          id: "book",
          name: "书单",
          icon: Book,
          selected: Book_Selected,
        },
        {
          id: "my",
          name: "喜欢",
          icon: My,
          selected: My_Selected,
        },
      ],
    };
  },
  methods: {
    tabClick(e) {
      this.defaultIcon(e);
      this.$router.push({ path: `/${this.selected}` });
    },
    defaultIcon(e) {
      this.tabList.map((value) => {
        if (value.id === e) {
          this.selected = value.id;
        }
      });
    },
  },
  created() {
    this.selected =
      this.$route.path.split("/")[1] === ""
        ? "classic"
        : this.$route.path.split("/")[1];
  },
};
</script>

<style lang="stylus" scoped>
// @import '~@styles//varibles.styl'
.tab-container
	position: fixed
	bottom: 0
	width: 100%
	height: 1rem
	z-index 102
	background #fff
	border-top :0.03rem solid #f5f5f5
	display: flex
	justify-content :space-around
	align-items: center
	.tab-item
		display: flex
		flex-direction: column
		justify-content: center
		align-items :center
		// background :$bgColor
		.item-img
			width :.6rem
			height :.6rem
		.item-txt
			font-size: .25rem
			color:#c7c7c7
</style>
