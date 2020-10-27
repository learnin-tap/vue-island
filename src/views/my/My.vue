<template>
  <div>
    <Header />
    <div>我是我的页面</div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/_header.vue";
import Footer from "@/components/_footer.vue";
export default {
  name: "My",
  components: {
    Header,
    Footer,
  },
};
</script>
