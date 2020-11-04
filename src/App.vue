<template>
  <div id="app">
    <Header />
    <keep-alive>
      <router-view />
    </keep-alive>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/_header";
import Footer from "@/components/_footer";
export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style></style>
