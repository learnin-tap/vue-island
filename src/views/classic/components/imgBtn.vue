<template>
  <div>
    <button class="container">
      <slot name="img"></slot>
    </button>
  </div>
</template>
<script>
export default {
  name: "imgBtn",
};
</script>

<style lang="stylus" scoped>
.container
  padding: 0 !important;
  border: none !important;
</style>
