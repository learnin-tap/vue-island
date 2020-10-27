<template>
  <div>
    <Header />
    <div>我是书单页面</div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/_header.vue";
import Footer from "@/components/_footer.vue";
export default {
  name: "Book",
  components: {
    Header,
    Footer,
  },
};
</script>
